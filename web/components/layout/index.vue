<template>
  <div>
    <div class="app-menu">
      <router-menu></router-menu>
    </div>
    <div class="app-main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import routerMenu from '@/components/menu';

export default {
  components: {
    routerMenu,
  },
};
</script>

<style scoped>
.app-menu {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 210px;
}

.app-main {
  margin-left: 210px;
  height: 100vh;
  overflow: auto;
}
</style>