<template>
  <router-link class="block card" :class="{ shadow: shadow }" :to="'/service/detail/' + info.id">
    <el-row type="flex" align="middle" class="flex-wrap">
      <el-image class="thumb flex-fixed" :src="info.images" :alt="info.title" fit="contain" />
      <div class="box flex-auto">
        <h4 class="name" to="/">{{ info.title }}</h4>
        <p class="company">{{ info.companyName }}</p>
        <p class="desc">{{ info.synopsis }}</p>
        <!-- <el-button class="btn" icon="el-icon-right" /> -->
      </div>
    </el-row>
  </router-link>
</template>

<script>

export default {
  props: {
    info: {
      type: Object,
      required: true,
      default: () => {}
    },
    shadow: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables';
@import '~@/styles/mixin';
.card {
  padding: 25px;
  background-color: #fff;
  transition: .3s ease;
  overflow: hidden;
  .thumb {
    width: 120px;
    height: 120px;
  }
  .box {
    padding: 0 24px;
    font-size: 14px;
    .name {
      margin-bottom: 8px;
      font-size: 18px;
      line-height: 30px;
      @include ellipsis;
    }
    .company {
      margin-bottom: 10px;
      color: #999;
    }
    .desc {
      line-height: 30px;
      color: #666;
      text-align: justify;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .btn {
      position: absolute;
      bottom: -25px;
      right: -25px;
      border: none;
      padding: 6px 15px;
      line-height: 20px;
      font-size: 20px;
      border-radius: 0;
      transition: .3s ease;
      z-index: 2;
    }
  }
  &.shadow:hover {
    box-shadow: 0 10px 30px rgba($color: #000000, $alpha: .06);
    .box {
      .name, .btn {
        color: $mainColor;
      }
    }
  }
}
@media only screen and (max-width:767px){
  .card {
    padding: 16px;
    .thumb {
      width: 80px;
      height: 80px;
    }
    .box {
      padding: 0 16px;
    }
  }
}
</style>
