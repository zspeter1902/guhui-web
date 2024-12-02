<template>
  <div class="tab-content">
    <div class="custom-tabs">
      <el-link :underline="false" class="active">税务服务</el-link>
    </div>
    <div class="custom-tab-content">
      <p style="margin-top: 10px;">出口退税是指国家为帮助出口企业降低成本，增强出口产品在国际市场上的竞争能力，鼓励出口创汇而实行的，由国内税务机关将在出口前的生产和流通的各环节中已经缴纳的国内增值税或消费税等间接税税款退还给出口企业的一项税收制度。</p>
      <p>出口退税主要使本国产品以不含税成本进入国际市场，与国外产品在同等条件下进行竞争，从而增强竞争能力，扩大出口创汇。</p>
      <p><br></p>
      <el-image :src="thumb" fit="cover" :preview-src-list="[thumb]" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '税务服务',
      active: 0,
      thumb: require('img/tax.jpg')
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
