<template>
  <router-link class="block card" :class="{ shadow: shadow }" :to="info.type == 2 ? '/company/' + info.targetId : '/service/detail/' + info.targetId">
    <!-- flex-wrap -->
    <el-row type="flex" align="middle" class="">
      <el-image class="thumb flex-fixed" :src="info.targetImg" :alt="info.targetName" fit="contain" />
      <div class="box flex-auto">
        <h4 class="name" to="/">{{ info.targetName }}</h4>
        <p class="company">{{ info.targetCompanyName }}</p>
        <p class="desc">{{ info.targetAbout }}</p>
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
    display: flex;
    flex-direction: column;
    height: 120px;
    padding: 0 24px;
    font-size: 14px;
    overflow: hidden;
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
      flex: 1;
      line-height: 30px;
      color: #666;
      text-align: justify;
      // display: -webkit-box;
      // -webkit-box-orient: vertical;
      // -webkit-line-clamp: 2;
      overflow: hidden;
      &::before {
        content: '...';
        float: right;
        height: 100%;
        display: flex;
        align-items: flex-end;
        shape-outside: inset(calc(100% - 1.5em) 0 0);
      }
      &::after{
        content: '';
        position: absolute;
        width: 999vh;
        height: 999vh;
        background: #fff;
        box-shadow: -2em 2em #fff;
      }
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
      height: 80px;
      padding: 0 16px;
      .name {
        margin-bottom: 4px;
        font-size: 16px;
        line-height: 28px;
      }
      .company {
        margin-bottom: 5px;
      }
    }
  }
}
</style>
