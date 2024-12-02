<template>
  <div class="tab-content">
    <div class="custom-tabs">
      <el-link :underline="false" class="active">税务服务</el-link>
    </div>
    <div class="custom-tab-content">
      <p style="margin-top: 10px;">通过安徽跨境公服平台，按照“清单核放，汇总申报”完成通关操作。对按财税〔2018〕103号规定适用增值税、消费税退税政策的，安徽跨境公服平台支持发送汇总申报数据，经汇总报关后生成报关单以供电商企业开展后续退税申报。</p>
      <p>在出口适用免税政策的货物，须在次月向主管税务机关办理增值税纳税申报，并提供《电子商务出口企业零售出口货物免税明细表》。平台可根据企业的跨境电商零售出口业务申报数据，查询并导出《电子商务出口企业零售出口货物免税明细表》。</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '税务服务',
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
  p {
    margin-top: 10px;
    text-indent: 2em;
    .el-link {
      text-indent: 0;
    }
  }
  .custom-tabs {
    background-color: $grayBg;
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
