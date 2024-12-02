<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <top-info />
    <div class="main-container">
      <div class="nav-container" :class="{'fixed-header':fixedHeader}">
        <el-row type="flex" justify="space-between" align="middle" class="hidden-sm-and-up">
          <logo />
          <hamburger :is-active="sidebar.opened" class="hamburger-container " @toggleClick="toggleSideBar" />
        </el-row>
        <sidebar class="sidebar-container" />
      </div>
      <app-main />
    </div>
    <site-footer />
    <bottom-float />
    <!-- <el-image class="main-pendant" :src="img" fit="cover" />
    <el-image class="main-pendant right" :src="img" fit="cover" /> -->
  </div>
</template>

<script>
import { BottomFloat, TopInfo, Sidebar, AppMain, SiteFooter } from './components'
import ResizeMixin from './mixin/ResizeHandler'
export default {
  name: 'Layout',
  components: {
    BottomFloat,
    TopInfo,
    Sidebar,
    AppMain,
    Logo: () => import('./components/Sidebar/Logo'),
    Hamburger: () => import('@/components/Hamburger'),
    SiteFooter
  },
  data() {
    return {
      img: require('img/deng1.png')
    }
  },
  mixins: [ResizeMixin],
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    fixedHeader() {
      return this.$store.state.settings.fixedHeader
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened, // !this.sidebar.opened
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods: {
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";
  .main-pendant {
    position: fixed;
    top: 0;
    right: 0;
    max-width: 320px;
    width: 30%;
    z-index: 99999;
    &.right {
      left: 0;
      right: auto;
      transform: rotateY(180deg);
    }
  }
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    &.mobile.openSidebar{
      position: fixed;
      top: 0;
    }
    .hamburger-container {
      line-height: normal;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;
    }
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .nav-container {
    box-shadow: 0 2px 10px rgba(0,0,0,0.02);
  }
  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
