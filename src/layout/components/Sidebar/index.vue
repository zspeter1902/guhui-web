<template>
  <div class="" :class="{'has-logo':showLogo}">
    <div class="container">

    </div>
      <div class="container">
    <el-row
      type="flex"
      align="middle"
      justify="space-between"
      class="flex-wrap sidebar-bg"
    >
        <logo v-if="showLogo" />
        <!-- horizontal vertical -->
        <!-- :collapse="isCollapse" -->
        <el-scrollbar wrap-class="scrollbar-wrapper">
          <el-menu
            v-if="!isCollapse"
            :default-active="activeMenu"
            :text-color="variables.menuText"
            :unique-opened="false"
            :active-text-color="variables.menuActiveText"
            :collapse-transition="false"
            :mode="device === 'mobile' ? 'vertical' : 'horizontal'"
          >
            <sidebar-item v-for="route in routes" :key="route.path" :item="route" :show-icon="false" :base-path="route.path" />
          </el-menu>
        </el-scrollbar>
    </el-row>
      </div>
    <!-- 搜索弹窗 -->
    <el-dialog title="搜索" :visible.sync="visible">
      <search />
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo, Search: () => import('./Search.vue') },
  data() {
    return {
      visible: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device'
    ]),
    routes({ $store }) {
      // return $store.getters.navList
      return this.$router.options.routes
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    },
    isLogin({ $store }) {
      return !!$store.getters.token
    }
  },
  methods: {
    onRelease(url) {
      if (this.isLogin) {
        this.$router.push(url)
      } else {
        this.$router.push('/login')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables';
.btn-search {
  padding-left: 12px;
  padding-right: 12px;
  margin-left: 10px;
}
</style>
