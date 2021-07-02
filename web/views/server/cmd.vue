<template>
  <div class="app-container">
    <div class="cmd-div">
      <el-input v-model="command" class="cmd-input" @keyup.enter.native="onCmd"></el-input>
      <el-button type="primary" @click="onCmd">cmd</el-button>
    </div>
    <div>
      <pre>{{ res }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  data() {
    return {
      command: '',
      res: '',
    };
  },
  methods: {
    async onCmd() {
      try {
        this.$ucLoading.show();
        this.res = await this.$post('/sys/cmd', {
          command: this.command,
        });
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
.cmd-div {
  display: flex;
}
.cmd-input {
  margin-right: 20px;
}
</style>
