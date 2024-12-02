<template>
  <el-row type="flex" justify="space-between" class="sidebar-logo-container">
    <router-link class="sidebar-logo-link" to="/">
      <el-row type="flex" align="middle">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <!-- <div class="logo-title hidden-xs-only">
          <h3>{{ title }}</h3>
          <h5>{{ titleEn }}</h5>
        </div> -->
      </el-row>
    </router-link>
    <!-- <div class="mobile-one hidden-xs-only">
      <el-link class="block" :underline="false" :href="'tel:' + telCall">
        <div class="icon inline-block">
          <i class="el-icon-phone" />
        </div>
        <span class="tel">{{ tel }}</span>
      </el-link>
    </div> -->
  </el-row>
</template>

<script>
// Anhui Province Cross-border E-commerce Innovation Service Center Public Service Platform
export default {
  name: 'SidebarLogo',
  data() {
    return {
      title: '安徽省跨境电商创新服务中心公共服务平台',
      titleEn: 'Anhui Province Cross-border E-commerce Innovation Service Center Public Service Platform',
      logo: require('img/logo.png'),
      telCall: '055166856580',
      tel: '0551-66856580'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
.sidebar-logo-container {
  position: relative;
  height: 70px;
  line-height: 70px;
  // top: -7px;
  overflow: hidden;
  user-select: none;
  .logo-title {
    margin-left: 12px;
    user-select: none;
    h3 {
      font-size: 20px;
      font-weight: bold;
      line-height: 28px;
    }
    h5 {
      font-size: 12px;
      line-height: 20px;
      color: #666;
      font-weight: bold;
    }
  }
  & .sidebar-logo-link {
    height: 100%;
    width: 100%;

    & .sidebar-logo {
      height: 70px;
      vertical-align: middle;
    }
  }
  .mobile-one {
    white-space: nowrap;
    .el-link {
      color: $mainColor;
      font-weight: bold;
    }
    .icon {
      width: 30px;
      height: 30px;
      color: #fff;
      border-radius: 15px;
      text-align: center;
      line-height: 30px;
      font-size: 18px;
      background-color: $mainColor;
      vertical-align: middle;
    }
    .tel {
      margin-left: 8px;
      font-size: 18px;
      vertical-align: middle;
    }
  }
}
@media only screen and (max-width:991px){
 .sidebar-logo-container {
    height: 60px;
    line-height: 60px;
    // top: -8px;
    .logo-title {
      margin-left: 12px;
      h3 {
        font-size: 18px;
        line-height: 24px;
      }
      h5 {
        line-height: 18px;
      }
    }
    & .sidebar-logo-link {
      & .sidebar-logo {
        height: 60px;
      }
    }
  }
}
@media only screen and (max-width:767px){
 .sidebar-logo-container {
    height: 40px;
    line-height: 40px;
    // top: -6px;
    & .sidebar-logo-link {
      order: 2;
      & .sidebar-logo {
        height: 40px;
      }
    }
    .mobile-one {
      order: 1;
    }
  }
}
</style>
