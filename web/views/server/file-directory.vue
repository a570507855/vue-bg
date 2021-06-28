<template>
  <div class="app-container directory">
    <div>
      <span>路径：{{ currentPath[0] ? currentPath[0].dir : '' }}</span>
      <el-button type="text" size="small" style="margin-left: 15px" @click="onPreDir">返回上一级</el-button>
      <el-button type="text" size="small" style="margin-left: 15px" @click="onUpdate">更新</el-button>
      <input type="file" webkitdirectory @change="onSelectDir" ref="fileUpload" style="display: none" />
    </div>
    <div style="display: flex; justify-content: space-between">
      <div>
        <div v-for="(item, index) in currentPath" :key="index" class="dir-item" @click="onClickPath(index, item)">
          <i v-if="item.isDir" class="iconfont icon-dir"></i>
          <i v-else class="iconfont" :class="iconMap[item.ext] || 'icon-wenjian'"></i>
          <span style="margin-left: 10px">{{ `${item.name}${item.ext}` }}</span>
        </div>
      </div>
      <div style="width: 66%; font-size: 18px">
        <pre>{{ fileContent }}</pre>
      </div>
    </div>
    <file-detail :path="filePath" :show="fileShow"></file-detail>
  </div>
</template>

<script>
import fileDetail from './file-directory-detail.vue';

export default {
  data() {
    return {
      paths: [],
      iconMap: {
        '.json': 'icon-json',
        '.txt': 'icon-txt',
        '.css': 'icon-css',
        '.js': 'icon-js',
        '.vue': 'icon-vue',
        '.html': 'icon-html',
        '.ts': 'icon-ts',
      },
      treeIndex: [],
      fileContent: '',
      filePath: '',
      fileShow: false,
    };
  },
  methods: {
    async onClickPath(index, path) {
      if (path.isDir) {
        return this.treeIndex.splice(this.treeIndex.length, 0, index);
      }
      this.filePath = `${path.dir}\\${path.base}`;
      this.fileShow = true;
    },
    onUpdate() {
      this.$refs['fileUpload'].click();
    },
    onPreDir() {
      if (!this.treeIndex.length) return;
      this.treeIndex.splice(this.treeIndex.length - 1, 1);
    },
    async onSelectDir(e) {
      const files = Array.from(e.target.files).filter((r) => !r.webkitRelativePath.includes('node_modules') && !r.webkitRelativePath.includes('.git'));
      const formData = new FormData();
      let dirs = [];
      files.forEach((item) => {
        let r = item.webkitRelativePath.replace('/', '\\').split('\\');
        r.splice(0, 1);
        dirs.push(r.join('\\'));
        formData.append('files', item);
      });
      try {
        this.$ucLoading.show();
        await this.$post('/directory/update', formData, { dirs: JSON.stringify(dirs) });
        this.onSearch();
        this.$message.success('更新成功！！！');
      } catch (err) {
        throw err;
      } finally {
        this.$ucLoading.hide();
        this.$refs['fileUpload'].value = '';
      }
    },
    async onSearch() {
      this.paths = await this.$post('/directory/get');
    },
  },
  computed: {
    currentPath() {
      if (!this.treeIndex.length) return this.paths;
      let path = JSON.parse(JSON.stringify(this.paths));
      this.treeIndex.forEach((item) => {
        path = path[item].children;
      });
      return path;
    },
  },
  async mounted() {
    this.onSearch();
  },
  components: {
    fileDetail,
  },
};
</script>

<style scoped>
.directory {
  position: relative;
}
.dir-item {
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}
</style>