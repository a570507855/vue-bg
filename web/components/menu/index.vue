<template>
  <div>
    <el-menu v-if="menu.length" :default-active="defaultActive">
      <div v-for="item in menu" :key="item.index">
        <el-submenu v-if="item.children.length" :index="item.index">
          <template slot="title">
            <span>{{ item.name }}</span>
          </template>
          <el-menu-item v-for="citem in item.children" :key="citem.index" :index="citem.index" :route="{ path: citem.route }" @click="onJump(citem)">
            <span>{{ citem.name }}</span>
          </el-menu-item>
        </el-submenu>
        <el-menu-item v-else :index="item.index" @click="onJump(item)">
          <span>{{ item.name }}</span>
        </el-menu-item>
      </div>
    </el-menu>
  </div>
</template>

<script>
import config from '@/settings';
import { setCurrentMenuRoute, getCurrentMenuRoute, setCurrentMenuIndex, getCurrentMenuIndex } from '@/script/lib/sessionStorage';

export default {
  data() {
    return {
      menu: [],
      defaultActive: '1-1',
    };
  },
  methods: {
    onJump(menu) {
      setCurrentMenuRoute(menu.route);
      setCurrentMenuIndex(menu.index);
      this.$router.push({ path: menu.route });
    },
  },
  async mounted() {
    this.menu = config.menu;
    await this.$nextTick();
    this.defaultActive = getCurrentMenuIndex() || '1-1';
    let route = getCurrentMenuRoute() || '/main/index';
    this.$router.push({ path: route });
  },
};
</script>

<style scoped>
.el-menu {
  height: 100vh;
}
</style>