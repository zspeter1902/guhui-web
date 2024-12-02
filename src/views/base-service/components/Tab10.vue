<template>
  <div class="tab-content">
    <div class="custom-tabs">
      <el-link :underline="false" class="active">统计分析</el-link>
    </div>
    <div class="custom-tab-content">
      <p>为安徽电商平台和企业提供个性化定制报告，通过行业情况分析、通关情况分析、跨境商品的销售分析以及用户行为分析为电商平台和企业助力赋能。</p>
      <p>为准确跨境电商行业发展情况，安徽跨境电商创新服务平台搭建了跨境电商数据监测体系，开展跨境电商数据统计与分析，向安徽跨境电商相关监管部门开放若干标准化查询功能，从而为政府决策提供数据支持。</p>
      <p>目前纳入监测范围的数据包括：</p>
      <p><b class="point" />直BT2出口数据（9710项下）</p>
      <p><b class="point" />C类快件形式出口数据</p>
      <p><b class="point" />海外仓出口数据（9810项下）</p>
      <p><b class="point" />部分企业跨境电商B2B出口数据</p>
      <!-- <p style="color:red;">备注：开展统计分析时，数据已进行脱敏处理，不会泄露企业信息。</p> -->
      <!-- 线上申报 -->
      <!-- <el-link class="btn" type="primary" target="_blank" :underline="false" href="/app/#/order-trade">申报</el-link> -->
    </div>
    <div class="text-right">
      <el-link class="more el-button el-button--primary" href="/app/#/" target="_blank">前往用户中心 &gt;</el-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '统计分析',
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
  }
  .point {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 10px;
    background-color: #46a3f4;
    border-radius: 50%;
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
