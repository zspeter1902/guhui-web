<template>
  <div v-if="banner" class="banner">
    <el-image class="img" :src="banner" fit="cover" />
    <h3 v-if="show" class="text-center">{{ title }}</h3>
  </div>
</template>

<script>
export default {
  props: {
    banner: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    title({ $route }) {
      return $route.meta.title
    }
  }
}
</script>
<style lang="scss" scoped>
.banner {
  position: relative;
  .img {
    width: 100%;
    // height: 400px;
    height: 200px;
    vertical-align: top;
  }
  h3 {
    position: absolute;
    left: 0;
    top: 50%;
    right: 0;
    font-size: 24px;
    color: #fff;
  }
}
@media only screen and (max-width:1199px){
  .banner {
    .img {
      height: 300px;
    }
  }
}
@media only screen and (max-width:991px){
  .banner {
    .img {
      height: 280px;
    }
  }
}
@media only screen and (max-width:767px){
  .banner {
    .img {
      height: 200px;
    }
  }
}
</style>
