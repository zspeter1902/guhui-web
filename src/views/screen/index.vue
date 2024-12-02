<template>
  <section class="screen">
    <el-scrollbar class="section">
      <!-- 顶部区域 -->
      <top @refresh="updateData" />
      <!-- 内容区域 -->
      <el-row class="content-height" type="flex" align="middle">
        <div class="content">
          <el-row type="flex" justify="space-between" :gutter="20">
            <!-- 左侧 -->
            <el-col class="left-content">
              <!-- 数据统计 企业总量、出口单量、出口金额 -->
              <div class="box total-box left right">
                <total ref="total" />
              </div>
              <!-- 跨境电商贸易方式 -->
              <div class="box trade-box left right">
                <h5 class="name">贸易方式</h5>
                <trade-mode ref="tradeMode" />
              </div>
              <!-- 企业分布 -->
              <div class="box company-box left right">
                <h5 class="name">企业类别分布</h5>
                <company-type ref="companyType" />
              </div>
            </el-col>
            <!-- 中间 -->
            <el-col class="middle-content">
              <!-- 出口国家分布图 -->
              <world-map />
              <!-- 当前年度报关记录  -->
              <!-- <div class="box current-box left right">
                <h5 class="name">年度报关对比</h5>
                <current-order />
              </div> -->
              <!-- 历史年份报关记录 -->
              <div class="box current-box left right">
                <h5 class="name">年度报关月度同比</h5>
                <history-order ref="historyOrder" />
              </div>
            </el-col>
            <!-- 右侧 -->
            <el-col class="right-content">
              <div class="flex">
                <!-- 报关排名/出口排名 -->
                <div class="box rank-box flex-fixed left right">
                  <h5 class="name">跨境电商企业报关统计</h5>
                  <company-rank ref="companyRank" />
                </div>
                <!-- 自动滚动活动 -->
                <div class="box activity-box left right flex-full">
                  <h5 class="name">培训活动</h5>
                  <activity ref="activity" />
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-row>
    </el-scrollbar>
  </section>
</template>

<script>
import Top from './components/Top.vue'
import CompanyType from './components/CompanyType.vue'
import TradeMode from './components/TradeMode.vue'
import Total from './components/Total.vue'
import HistoryOrder from './components/HistoryOrder.vue'
import WorldMap from './components/WorldMap.vue'
import CompanyRank from './components/CompanyRank.vue'
import Activity from './components/Activity.vue'
// import CurrentOrder from './components/CurrentOrder.vue'
export default {
  name: 'Screen',
  components: { Top, CompanyType, TradeMode, Total, HistoryOrder, WorldMap, CompanyRank, Activity },
  data() {
    return {
    }
  },
  methods: {
    // 更新与刷新数据
    updateData() {
      this.$nextTick(() => {
        // this.$refs.total.refresh()
        this.$refs.tradeMode.refresh()
        this.$refs.companyType.refresh()
        // this.$refs.historyOrder.refresh()
        // this.$refs.companyRank.refresh()
        this.$refs.activity.refresh()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
// #1f4ba7 暗蓝色一级
// 31  75  167
// #0f408c 暗蓝色二级 15 64 140
// #2f93cf 暗青色
// 47  147 207
// #beeaf8 浅青色
// 190 234 248

.screen {
  height: 100%;
  user-select: none;
  // overflow-y: hidden;
}
.section {
  height: 100%;
  // background-color: #00031B;
  // linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)),
  background: url(./img/bg3.jpg) center center;
  // background-blend-mode: darken;
  .content-height {
    width: 100%;
    min-height: calc(100vh - 91px - 24px);
    margin-top: 24px;
  }
  .content {
    position: relative;
    width: 100%;
    padding: 0px 20px 20px;
    color: #fff;
    z-index: 1;
    .box {
      position: relative;
      background: linear-gradient(180deg, rgba(15, 64, 140, 0.4) 0%, rgba(31, 75, 167, 0.04) 100%);
      box-shadow: 0px 0px 50px 0px rgba(31, 75, 167, 0.2) inset;
      border: 1px solid rgba(190, 234, 248, 0.2);
      border-image: linear-gradient(rgba(47,147,207,0.08), rgba(190,234,248, 0.4)) 1 1;
      vertical-align: top;
      & + .box {
        margin-top: 18px;
      }
      &.left::before, &.right::after {
        content: '';
        position: absolute;
        width: 12px;
        height: 12px;
        border: 2px solid #2f93cf;
      }
      &.left::before {
        left: 0;
        top: 0;
        border-right: none;
        border-bottom: none;
      }
      &.right::after {
        right: 0;
        bottom: 0;
        border-left: none;
        border-top: none;
      }
    }
  }
  .left-content {
    width: 26%;
    .box {
      background: rgba(26, 89, 251, 0.04) url(./img/line.png);
    }
    .company-box {
      padding: 18px 20px 20px;
      .name {
        margin: 0 0 20px;
        font-size: 16px;
        line-height: 26px;
        font-weight: normal;
        font-family: 'PingFang-SC-Medium';
      }
    }
    .trade-box {
      padding: 18px 20px 20px;
      .name {
        margin: 0 0 10px;
        font-size: 16px;
        line-height: 26px;
        font-weight: normal;
        font-family: 'PingFang-SC-Medium';
      }
    }
  }
  .middle-content {
    position: relative;
    width: 50%;
    .map-echart {
      width: 100%;
      margin-top: 20px;
    }
    .current-box {
      padding: 18px 20px 20px;
      .name {
        margin: 0 0 10px;
        font-size: 16px;
        line-height: 26px;
        font-weight: normal;
        font-family: 'PingFang-SC-Medium';
      }
    }
  }
  .right-content {
    width: 24%;
    .flex {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
    }
    .flex-full {
      flex: 1;
    }
    .flex-fixed {
      flex: 0 0 auto;
    }
    .box {
      background: rgba(26, 89, 251, 0.04) url(./img/line.png);
    }
    .rank-box {
      min-height: 168px;
      padding: 18px 20px 20px;
      // margin-top: 26px;
      .name {
        margin: 0 0 10px;
        font-size: 16px;
        line-height: 26px;
        font-weight: normal;
        font-family: 'PingFang-SC-Medium';
      }
      .value {
        font-size: 35px;
        font-weight: bold;
        color: #CC6131;
        line-height: 50px;
      }
    }
    .activity-box {
      min-height: 168px;
      padding: 18px 20px 20px;
      // margin-top: 26px;
      .name {
        margin: 0 0 10px;
        font-size: 16px;
        line-height: 26px;
        font-weight: normal;
        font-family: 'PingFang-SC-Medium';
      }
    }
  }
  ::v-deep {
    .el-scrollbar__wrap {
      overflow-x: hidden;
      overflow-y: auto;
    }
  }
}
</style>
