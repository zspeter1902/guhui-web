<template>
  <div class="tab-content">
    <div class="custom-tabs">
      <el-link :underline="false" class="active">通关服务</el-link>
    </div>
    <div class="custom-tab-content">
      <p>为跨境电商进出口企业提供在线报关服务（9610、9710、9810），简化操作流程，实现申报、查询、自动归并、汇总数据等功能。利用信息化手段，优化跨境电商进出口通关流程。</p>
      <p>根据海关总署公告2018年第194号规定，跨境电子商务零售出口商品申报前，跨境电子商务企业或其代理人、物流企业应当分别通过国际贸易“单一窗口”或跨境电子商务通关服务平台向海关传输交易、收款、物流等电子信息，并对数据真实性承担相应法律责任。</p>
      <p><br></p>
      <el-row type="flex" align="middle" class="flex-wrap">
        <el-col :md="2" :sm="8" :xs="8">
          <el-image :src="require('img/declare_name.png')" />
        </el-col>
        <el-col :md="4" :sm="6" :xs="6">
          <div class="line" />
        </el-col>
        <el-col :md="2" :sm="8" :xs="8">
          <el-image :src="require('img/declare_1.png')" />
        </el-col>
        <el-col :md="2" :sm="8" :xs="8" class="text-center">
          <el-image :src="require('img/declare_arrow.png')" />
        </el-col>
        <el-col :md="2" :sm="8" :xs="8">
          <el-image :src="require('img/declare_2.png')" />
        </el-col>
        <el-col :md="2" :sm="8" :xs="8" class="text-center">
          <el-image :src="require('img/declare_arrow.png')" />
        </el-col>
        <el-col :md="2" :sm="8" :xs="8">
          <el-image :src="require('img/declare_3.png')" />
        </el-col>
        <el-col :md="2" :sm="8" :xs="8" class="text-center">
          <el-image :src="require('img/declare_arrow.png')" />
        </el-col>
        <el-col :md="2" :sm="8" :xs="8">
          <el-image :src="require('img/declare_4.png')" />
        </el-col>
        <el-col :md="2" :sm="8" :xs="8" class="text-center">
          <el-image :src="require('img/declare_arrow.png')" />
        </el-col>
        <el-col :md="2" :sm="8" :xs="8">
          <el-image :src="require('img/declare_5.png')" />
        </el-col>
      </el-row>
      <div class="text-right">
        <el-link class="more el-button el-button--primary" href="/app/#/" target="_blank">前往用户中心 &gt;</el-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '跨境通关',
      active: 0
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
  .indent {
    padding-left: 2em;
  }
  .indent-1 {
    padding-left: 4em;
  }
  p {
    margin-top: 16px;
    text-indent: 2em;
    .el-link {
      text-indent: 0;
    }
  }
  .more {
    color: #fff;
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
    .line {
      width: 80%;
      margin: 0 auto;
      border-bottom: 1px dashed #5eaaff;
    }
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
