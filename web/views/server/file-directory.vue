<template>
  <div class="app-container">
    <div>
      <el-button @click="onPreDir">返回上一级</el-button>
    </div>
    <div style="display: flex; justify-content: space-between">
      <div>
        <div v-for="(item, index) in currentPath" :key="index" class="dir-item" @click="onClickPath(index, item)">
          <i v-if="item.isDir" class="iconfont icon-dir"></i>
          <i v-else class="iconfont" :class="iconMap[item.ext]"></i>
          <span style="margin-left: 10px">{{ `${item.name}${item.ext}` }}</span>
        </div>
      </div>
      <div style="width: 66%; font-size: 18px">
        <pre>{{ fileContent }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      paths: [],
      iconMap: {
        '': 'icon-wenjian',
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
    };
  },
  methods: {
    async onClickPath(index, path) {
      if (!path.isDir) {
        this.fileContent = await this.$post('/directory/readFile', {
          path: `${path.dir}/${path.base}`,
        });
        return;
      }
      this.treeIndex.splice(this.treeIndex.length, 0, index);
    },
    onPreDir() {
      if (!this.treeIndex.length) return;
      this.treeIndex.splice(this.treeIndex.length - 1, 1);
    },
  },
  computed: {
    currentPath() {
      if (!this.treeIndex.length) return this.paths;
      let path = JSON.parse(JSON.stringify(this.paths));
      let res = this.treeIndex.map((memo, item) => {
        path = path[item];
        memo = path[item];
        return memo;
      }, []);
      console.log(res);
    },
  },
  async mounted() {
    this.paths = await this.$post('/directory/get');
    console.log(this.paths);
  },
};
</script>

<style scoped>
.dir-item {
  height: 30px;
  line-height: 30px;
  cursor: pointer;
}
</style>