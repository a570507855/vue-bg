<template>
  <div class="app-container file-detail" v-show="show">
    <div>
      路径：
      <span style="cursor: pointer; color: #409eff" @click="onCopyPath">{{ path }}</span>
      <el-button type="text" size="small" style="margin-left: 15px" @click="onBack">返回</el-button>
      <el-button type="text" size="small" style="margin-left: 15px" @click="onEdit">{{ isEdit ? '取消编辑' : '编辑' }}</el-button>
      <el-button type="text" size="small" style="margin-left: 15px" @click="onSave" v-if="isEdit">保存</el-button>
      <el-button type="text" size="small" style="margin-left: 15px" @click="onRun" v-if="ext === 'ts'">运行</el-button>
    </div>
    <pre v-if="isComplete && !isEdit" v-highlightjs>
      <code :class="highType[ext] || 'plaintext'" ref="code" contenteditable="true">{{ content }}</code>
    </pre>
    <div v-if="isEdit" style="margin-top: 28px">
      <el-input type="textarea" v-model="inputContent" resize="none" rows="35"></el-input>
    </div>
    <el-dialog :visible.sync="isShowResult" width="40%">
      <pre>{{ result }}</pre>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      inputContent: '',
      result: '',
      isEdit: false,
      isComplete: false,
      isShowResult: false,
      highType: {
        html: 'html',
        js: 'javascript',
        ts: 'typescript',
        css: 'css',
        json: 'json',
      },
    };
  },
  props: {
    show: Boolean,
    path: String,
  },
  methods: {
    onBack() {
      this.$parent.fileShow = false;
      this.isEdit = false;
    },
    onCopyPath() {
      this.$copy(this.path);
      this.$message.success('复制成功！！！');
    },
    onEdit() {
      this.isEdit = !this.isEdit;
      this.inputContent = this.content;
    },
    async onRun() {
      try {
        this.$ucLoading.show();
        this.result = await this.$post('/sys/cmd', {
          command: `ts-node ${this.path}`,
        });
        this.isShowResult = true;
      } catch (err) {
        throw err;
      } finally {
        this.$ucLoading.hide();
      }
    },
    async onSave() {
      try {
        this.$ucLoading.show();
        await this.$post('/directory/updateFile', {
          path: this.path,
          content: this.inputContent,
        });
        this.$message.success('保存成功！！！');
        this.content = this.inputContent;
        this.isEdit = false;
      } catch (err) {
        throw err;
      } finally {
        this.$ucLoading.hide();
      }
    },
  },
  computed: {
    ext() {
      let paths = this.path.split('.');
      return paths[paths.length - 1];
    },
  },
  watch: {
    async path() {
      try {
        this.$ucLoading.show();
        this.isComplete = false;
        this.inputContent = this.content = await this.$post('/directory/readFile', { path: this.path });
        this.isComplete = true;
      } catch (err) {
        throw err;
      } finally {
        this.$ucLoading.hide();
      }
    },
  },
};
</script>

<style scoped>
.file-detail {
  position: absolute;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100%;
  background-color: white;
}
</style>