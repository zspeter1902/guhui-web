<template>
  <div class="service-container">
    <banner :banner="banner" />
    <el-row type="flex" class="my-container container bg-white flex-wrap">
      <!-- 导航 -->
      <service-nav class="flex-fixed" />
      <!-- layout -->
      <div class="my-content flex-auto">
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key" />
        </transition>
      </div>
    </el-row>
  </div>
</template>

<script>
import Banner from '@/components/Banner'
import ServiceNav from './components/Nav.vue'
export default {
  name: 'MyIndex',
  components: { Banner, ServiceNav },
  data() {
    return {
      banner: require('img/overseas-banner.jpg')
    }
  },
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables';
.service-container {
  position: relative;
  overflow: hidden;
  .banner {
    height: 200px;
    margin-bottom: 20px;
  }
  .my-container {
    margin-bottom: 40px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: .08);
  }
  .my-content {
    position: relative;
    min-height: 500px;
    padding: 20px;
    overflow: hidden;
  }
}
@media only screen and (max-width:1199px){
  .service-container {
    .banner {
      height: 160px;
    }
  }
}
@media only screen and (max-width:991px){
  .service-container {
    .banner {
      height: 120px;
    }
  }
}
@media only screen and (max-width:767px){
  .service-container {
    .banner {
      height: 80px;
    }
    .my-content {
      padding-top: 0;
    }
  }
}
</style>
