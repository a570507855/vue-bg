<template>
  <div class="app-container file-detail" v-show="show">
    <div>
      <span>路径：{{ path }}</span>
      <el-button type="text" size="small" style="margin-left: 15px" @click="onBack">返回</el-button>
    </div>
    <pre>{{ content }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: '',
    };
  },
  props: {
    show: Boolean,
    path: String,
  },
  methods: {
    onBack() {
      this.$parent.fileShow = false;
    },
  },
  watch: {
    async path() {
      try {
        this.$ucLoading.show();
        this.content = await this.$post('/directory/readFile', { path: this.path });
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
  width: 100vh;
  background-color: white;
}
</style>