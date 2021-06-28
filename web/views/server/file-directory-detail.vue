<template>
  <div class="app-container file-detail" v-show="show">
    <div>
      <span>路径：{{ path }}</span>
      <el-button type="text" size="small" style="margin-left: 15px" @click="onBack">返回</el-button>
      <el-button type="text" size="small" style="margin-left: 15px" @click="onEdit">{{ isEdit ? '取消编辑' : '编辑' }}</el-button>
      <el-button type="text" size="small" style="margin-left: 15px" @click="onSave" v-if="isEdit">保存</el-button>
    </div>
    <pre v-if="!isEdit">{{ content }}</pre>
    <div v-else>
      <el-input type="textarea" v-model="inputContent" resize="none" rows="35"></el-input>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
      inputContent: '',
      isEdit: false,
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
    onEdit() {
      this.isEdit = !this.isEdit;
      this.inputContent = this.content;
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
  watch: {
    async path() {
      try {
        this.$ucLoading.show();
        this.inputContent = this.content = await this.$post('/directory/readFile', { path: this.path });
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