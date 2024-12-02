<template>
  <nav class="service-nav">
    <el-menu
      :default-active="activeMenu"
      :text-color="variables.menuText"
      :unique-opened="false"
      :active-text-color="variables.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <sidebar-item-component v-for="route of navList" :key="route.path" v-isOverseas="route.meta.title" :item="route" :base-path="'/my/collect/' + route.path" />
    </el-menu>
  </nav>
</template>

<script>
import isOverseas from '@/directive/isOverseas/index'
import userRouter from '@/router/modules/user'
import variables from '@/styles/variables.scss'
import SidebarItem from '@/layout/components/Sidebar/SidebarItem.vue'
export default {
  directives: {
    isOverseas
  },
  components: { SidebarItem },
  computed: {
    navList() {
      return userRouter.children[0].children
    },
    variables() {
      return variables
    },
    activeMenu({ $route }) {
      const { meta, path } = $route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    basePath({ $route }) {
      return $route.path
    }
  },
  mounted() {
  },
  // 方法集合
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
.service {
  &-nav {
    width: 200px;
    overflow: hidden;
  }
}
@media only screen and (max-width:991px){
  .service {
    &-nav {
      width: 100%;
      .nav-item {
        display: inline-block;
      }
    }
  }
}
</style>
