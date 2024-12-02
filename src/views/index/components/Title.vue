<template>
  <el-row type="flex" justify="center" align="middle" class="title">
    <el-image v-if="icon" class="icon" :src="icon" fit="contain" />
    <div class="info" :class="{'text-center': !icon}">
      <h4 :class="theme">
        {{ name }}
      </h4>
      <p v-if="subName">{{ subName }}</p>
    </div>
  </el-row>
</template>

<script>

export default {
  props: {
    theme: {
      type: String,
      default: 'gray' // gray blue
    },
    name: {
      type: String,
      required: true,
      default: ''
    },
    subName: {
      type: String,
      required: true,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
.title {
  position: relative;
  margin: 0 auto;
  line-height: 24px;
  color: $blackColor;
  user-select: none;
  .icon {
    width: 68px;
    height: 68px;
    margin-right: 18px;
  }
  h4 {
    display: inline-block;
    margin-bottom: 5px;
    // border: 2px solid transparent;
    line-height: 38px;
    font-size: 32px;
    border-radius: 22px;
    &.gray {}
    &.blue {
      margin-bottom: 10px;
      padding: 0 27px;
      border: 8px solid #fff;
      color: #fff;
      background-color: $mainColor;
    }
  }
  p {
    font-size: 14px;
    line-height: 20px;
    font-weight: 300;
  }
}
@media only screen and (max-width:1199px){
  .title {
    .icon {
      width: 60px;
      height: 60px;
      margin-right: 16px;
    }
    h4 {
      font-size: 28px;
      &.blue {
        padding: 0 26px;
        border-width: 6px;
      }
    }
  }
}
@media only screen and (max-width:991px){
  .title {
    .icon {
      width: 54px;
      height: 54px;
      margin-right: 14px;
    }
    h4 {
      // margin-bottom: 8px;
      line-height: 30px;
      font-size: 24px;
      &.blue {
        border-radius: 20px;
        border-width: 4px;
      }
    }
    p {
      font-size: 12px;
    }
  }
}
@media only screen and (max-width:767px){
  .title {
    .icon {
      width: 48px;
      height: 48px;
      margin-right: 12px;
    }
    h4 {
      margin-bottom: 0;
      line-height: 24px;
      font-size: 18px;
      &.blue {
        margin-bottom: 5px;
        border-radius: 18px;
        border-width: 5px;
      }
    }
  }
}
</style>
