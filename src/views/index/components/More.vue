<template>
  <router-link :to="to" class="more text-center">
    <span class="block">查看更多</span>
    <i class="el-icon-d-arrow-left" />
  </router-link>
</template>

<script>

export default {
  props: {
    to: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
.more {
  display: block;
  width: 92px;
  margin: 0 auto;
  line-height: 24px;
  letter-spacing: 3px;
  font-size: 14px;
  color: #969696;
  user-select: none;
  span {
    position: relative;
    border: 1px solid #969696;
    border-radius: 9px;
    overflow: hidden;
    transition: all .28s ease;
    z-index: 2;
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: $mainColor;
      transform: rotateX(90deg);
      transform-origin: bottom;
      transition: transform .28s ease;
      z-index: -1;
    }
  }
  i {
    transform: rotateZ(-90deg);
  }
  &:hover {
    color: $mainColor;
    span {
      color: #fff;
      border-color: $mainColor;
      &:before {
        transform-origin: top;
        transform: rotateY(0deg);
      }
    }
  }
}
</style>
