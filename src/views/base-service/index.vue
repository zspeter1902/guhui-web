<template>
  <div class="register-container">
    <!-- banner -->
    <banner :banner="banner" />
    <!-- 新闻分类 -->
    <div class="container register">
      <el-tabs v-model="activeName" :tab-position="isMobile ? 'top' : 'left'" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) of navList.children" :key="item.id" :label="item.dictName" :name="'tab' + index">
          <tab-pane :key="item.dictName" :current="item.dictName" :code="parseData(item.dictCode)" />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>

import Banner from '@/components/Banner'
import TabPane from './components/TabPane.vue'
export default {
  name: 'BaseService',
  components: { Banner, TabPane },
  data() {
    return {
      activeName: 'tab0',
      banner: require('img/service-banner.png'),
      filter: '服务介绍'
    }
  },
  computed: {
    isMobile({ $store }) {
      return $store.getters.device === 'mobile'
    },
    navList({ $store, filter }) {
      const list = $store.getters.navList.filter(item => item.dictName === filter)
      return list[0]
    },
    firstCode({ navList }) {
      const arr = navList.children[0].dictCode.split('_')
      const first = arr[arr.length - 1]
      return first
    },
    activeCode({ $route, firstCode }) {
      return $route.params.type || firstCode
    }
  },
  watch: {
    activeCode(val) {
      if (val === 'index') {
        this.activeName = 'tab0'
      } else {
        const reg = new RegExp(val + '$')
        this.navList.children.forEach((item, index) => {
          if (reg.test(item.dictCode)) {
            this.activeName = 'tab' + index
            return
          }
        })
      }
    }
  },
  created() {
    this.getTabs()
  },
  methods: {
    getTabs() {
      const list = this.navList.children
      if (this.activeCode === 'index') {
        this.$router.push({
          params: {
            type: this.firstCode
          }
        })
        return
      }
      const reg = new RegExp(this.activeCode + '$')
      list.forEach((item, index) => {
        if (reg.test(item.dictCode)) {
          this.activeName = 'tab' + index
          this.$router.push({
            params: {
              type: this.activeCode || this.firstCode
            }
          })
        }
      })
    },
    handleClick(tab, event) {
      const first = this.parseData(this.navList.children[tab.index].dictCode)
      this.$router.push({
        params: {
          type: tab.index > 0 ? first : this.firstCode
        }
      })
    },
    parseData(code) {
      const arr = code.split('_')
      return arr.length ? arr[arr.length - 1] : ''
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables';
@import '~@/styles/mixin';
.register-container {
  .register {
    padding: 30px 20px 40px;
    border: 1px solid $infoColor;
    ::v-deep {
      .el-breadcrumb {
        margin-top: 0;
      }
    }
  }
  ::v-deep {
    .more {
      margin-top: 30px;
    }
    .el-tabs__header {
      margin-right: 0px;
    }
    .el-tabs__nav-wrap {
      margin: 0;
      &::after {
        display: none;
      }
    }
    .el-tabs__active-bar {
      display: none;
    }
    .el-tabs__nav {
      padding-right: 36px;
    }
    .el-tabs__item {
      width: 130px;
      height: 50px;
      border-bottom: 1px solid #fff;
      line-height: 50px;
      font-size: 16px;
      text-align: center;
      background-color: $grayBg;
      transition: all .2s;
      &::after {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        border-top: 7px solid transparent;
        border-bottom: 7px solid transparent;
        border-right: 9px solid transparent;
        border-left: 9px solid $mainColor;
        transform: translate(100%, -50%);
        opacity: 0;
        transition: all .2s;
      }
      &:hover,
      &.is-active {
        color: #fff;
        background-color: $mainColor;
        &::after {
          opacity: 1;
        }
      }
    }
  }
}
@media only screen and (max-width:767px){
  .register-container {
    .register {
      padding: 20px 16px 30px;
      ::v-deep {
        .el-breadcrumb {
          margin-top:10px;
        }
      }
    }
    ::v-deep {
      .el-tabs__nav {
        padding-right: 0px;
      }
      .el-tabs--top .el-tabs__item.is-top:nth-child(2) {
        padding-left: 15px;
      }
      .el-tabs--top .el-tabs__item.is-top:last-child {
        padding-right: 15px;
      }
      .el-tabs__item {
        width: auto;
        height: 40px;
        padding: 0 15px;
        font-size: 14px;
        line-height: 40px;
        &::after {
          display: none;
        }
      }
    }
  }
}
</style>
