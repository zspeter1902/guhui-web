<template>
  <div v-show="list.length" class="sidebar">
    <dl>
      <el-row type="flex" :gutter="16" class="flex-wrap">
        <el-col v-for="item of list" :key="item.dictCode" :xs="12" :sm="8" :md="24" class="sidebar-item text-center" :class="{active: item.dictCode === active}" tag="dd">
          <el-link :underline="false" class="sidebar-link" @click="onTap(item.dictCode)">{{ item.dictName }}</el-link>
        </el-col>
      </el-row>
    </dl>
  </div>
</template>

<script>

export default {
  // 定义属性
  props: {
    list: {
      type: Array,
      default: () => []
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      active: ''
    }
  },
  computed: {
    first({ list }) {
      if (list.length) {
        return list[0].dictCode
      }
      return ''
    }
  },
  watch: {
    // selected(newVal) {
    //   if (newVal && !this.active) {
    //     this.onTap(this.first)
    //   } else {
    //     this.onTap(this.active)
    //   }
    // }
  },
  // 生命周期 - 创建完成（可以访问当前this实例）
  // 方法集合
  methods: {
    onTap(code) {
      this.active = code
      this.$emit('tap', code)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
.sidebar {
  width: 210px;
  padding: 10px 20px 20px;
  margin-bottom: 30px;
  border: 1px solid #e5e5e5;
  border-top: 2px solid $mainColor;
  background-color: #fff;
}
.sidebar-title {
  margin-bottom: 10px;
  font-size: 18px;
  color: $mainColor;
  line-height: 38px;
  font-weight: bold;
}
.sidebar-link {
  position: relative;
  display: block;
  font-size: 16px;
  line-height: 38px;
  border: 1px solid #ddd;
  border-radius: 6px;
  transition: .3s ease;
  z-index: 1;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $mainColorHover;
    transform: rotateY(90deg);
    transform-origin: right;
    transition: transform .3s ease;
    z-index: -1;
  }
  &:hover {
    color: #fff;
    border-color: $mainColorHover;
    &::before {
      width: 100%;
      transform: rotateY(0deg);
      transform-origin: left;
    }
  }
}
.active {
  .sidebar-link {
    color: #fff;
    background-color: $mainColor;
    border-color: $mainColor;
  }
}
.sidebar-item {
  margin-bottom: 20px;
}
</style>
