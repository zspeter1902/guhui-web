<template>
  <div class="tab-content">
    <div class="custom-tabs">
      <el-link :underline="false" :class="{active: active == 0}" @click="active = 0">跨境收款</el-link>
      <el-link :underline="false" :class="{active: active == 1}" @click="active = 1">跨境付款</el-link>
    </div>
    <transition name="fade">
      <div v-if="active == 0" class="custom-tab-content">
        <p>为中国大陆境内居民从事出口跨境电子商务贸易的卖家（个人/企业）提供境外外汇收款服务。</p>
        <el-image :src="icon1" fit="contain" />
        <!-- <div v-for="item of lists" :key="item.id" class="item">
          <div v-html="item.about" />
          <p>
            官网：<el-link
              :underline="false"
              type="primary"
              target="_blank"
              :href="item.companyUrl"
            >{{ item.companyUrl }}</el-link>
          </p>
        </div> -->
      </div>
      <div v-if="active == 1" class="custom-tab-conten">
        <p>为从事进口跨境电子商务贸易的卖家提供境内人民币付款服务。</p>
        <el-image :src="icon2" fit="contain" />
      </div>
    </transition>
    <div class="text-center">
      <router-link class="more el-button el-button--primary" to="/service/settlement">查看相关产品</router-link>
    </div>
  </div>
</template>

<script>
import { getPlatformList } from '@/api/company'
export default {
  props: {
    code: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      name: '跨境结算',
      active: 0,
      lists: [],
      icon1: require('img/settlement1.png'),
      icon2: require('img/settlement2.png')
    }
  },
  computed: {
    type({ $route }) {
      return $route.params.type
    }
  },
  watch: {
    type(newVal) {
      if (newVal === this.code && !this.lists.length) {
        this.getList()
      }
    }
  },
  created() {
    if (this.code === this.type) {
      this.getList()
    }
  },
  methods: {
    getList() {
      getPlatformList({
        serviceType: this.type,
        cancelHttp: true
      }).then(res => {
        this.lists = res.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/variables";
.tab-content {
  min-height: 300px;
  font-size: 16px;
  line-height: 36px;
  .item {
    margin-bottom: 40px;
  }
  ::v-deep {
    p {
      margin-top: 10px;
      text-indent: 2em;
      .el-link {
        text-indent: 0;
      }
    }
  }
  .custom-tabs {
    background-color: $infoColor;
    border-bottom: 2px solid $mainColor;
    .el-link {
      width: 160px;
      padding: 0 20px;
      line-height: 40px;
      color: #333;
      font-size: 16px;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
      &.active {
        background-color: $mainColor;
        color: #fff;
      }
    }
  }
  .custom-tab-content {
    padding: 20px 16px 16px;
  }
}
@media only screen and (max-width: 991px) {
  .tab-content {
    .custom-tabs {
      .el-link {
        width: 140px;
      }
    }
  }
}
@media only screen and (max-width: 991px) {
  .tab-content {
    .custom-tabs {
      .el-link {
        width: 100px;
        font-size: 14px;
        line-height: 32px;
      }
    }
  }
}
</style>
