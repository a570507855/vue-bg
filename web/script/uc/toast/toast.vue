<template>
  <div class="toast" v-if="show">
    {{ text }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      show: false,
    };
  },
};
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); /* 50%为自身尺寸的一半 */
  -webkit-transform: translate(-50%, -50%);
  height: 30px;
  line-height: 30px;
  padding: 0 20px;
  border-radius: 20px;
  color: white;
  background-color: rgb(76, 76, 76);
  z-index: 10000;
  touch-action: pan-y;
  word-break: keep-all;
  white-space: nowrap;
}
</style>