<template>
  <div class="activity-scroll">
    <div class="table">
      <el-table
        :show-header="true"
        class="empty"
      >
        <el-table-column min-width="60%" label="活动" align="center" prop="range" />
        <el-table-column min-width="30%" label="日期" align="center" prop="actName" />
        <el-table-column min-width="20%" label="热度" align="center" prop="totalAmount" />
      </el-table>
      <vue-seamless-scroll :data="lists" class="seamless-warp" :class-option="optionSetting" :style="'height:' + height + 'px'">
        <el-table
          :data="lists"
          :show-header="false"
          class="lists"
        >
          <el-table-column min-width="62%" label="活动名称" align="left" prop="actName">
            <template slot-scope="{ row }">
              <el-tooltip class="item" effect="dark" :content="row.actName" placement="bottom">
                <span class="ellipsis block">{{ row.actName }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column min-width="26%" label="日期" align="center">
            <template slot-scope="{ row }">{{ parseTime(row.startTime) }}</template>
          </el-table-column>
          <el-table-column min-width="12%" label="热度" align="right" prop="signUpNum">
            <template slot-scope="{ row }">{{ row.signUpNum > row.signUpNumStatic ? row.signUpNum : row.signUpNumStatic }}</template>
          </el-table-column>
        </el-table>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script>
import vueSeamlessScroll from 'vue-seamless-scroll'
import { getActivityListHistory } from '@/api/content'
export default {
  components: {
    vueSeamlessScroll
  },
  data() {
    return {
      height: 100,
      lists: []
    }
  },
  computed: {
    optionSetting() {
      return {
        step: 0.2, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        // autoPlay: false,
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000 // 单步运动停止的时间(默认值1000ms)
      }
    }
  },
  created() {
    this.getData()
    this.initSize()
  },
  mounted() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  methods: {
    refresh() {
      this.getData()
    },
    parseTime(str) {
      // 获取当前时间
      const myDate = new Date(str)
      const yy = String(myDate.getFullYear())
      const mm = myDate.getMonth() < 9 ? '0' + (myDate.getMonth() + 1) : myDate.getMonth() + 1
      const dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
      return yy + '-' + mm + '-' + dd
    },
    $_resizeHandler() {
      this.initSize()
    },
    initSize() {
      const { body } = document
      const rect = body.getBoundingClientRect()
      this.height = Math.floor(((rect.height - 91 - 24 - 20) * 0.64) - 18 - 20 - 20 - 26 - 10 - 46)
    },
    getData() {
      getActivityListHistory({
        page: 1,
        limit: 36
      }).then(res => {
        // .filter(item => !item.actName.includes('马鞍山'))
        this.lists = res.page.list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
@import '~@/styles/variables';
@import '~@/styles/mixin';
.activity-scroll {
  .table {
    .seamless-warp {
      // height: 400px;
      overflow: hidden;
      visibility: visible;
    }
    ::v-deep {
      .el-scrollbar__wrap {
        overflow-x: hidden;
        overflow-y: auto;
      }
      .el-table {
        background-color: transparent;
        .el-table__header-wrapper{
          margin-bottom: 10px;
          box-shadow: 0px 0px 30px 0px rgba(2, 234, 255, 0.2) inset;
        }

        .el-table__header-wrapper th,
        .el-table__fixed-header-wrapper th {
          padding: 6px 0;
          border: none;
          background: linear-gradient(180deg, rgba(26, 89, 251, 0.04) 0%, rgba(27, 102, 252, 0.2) 100%);

        }
        .el-table__fixed-header-wrapper thead,
        .el-table__header-wrapper tr {
          color: rgba($color: #ffffff, $alpha: 0.8);
        }
        .cell {
          line-height: 24px;
        }
        tr {
          background-color: transparent;
        }
        td, th.is-leaf {
          border: none;
        }
        td {
          padding-top: 6px;
          padding-bottom: 6px;
          color: rgba($color: #ffffff, $alpha: 0.8);
        }
      }
      .el-table__empty-text {
        color: rgba(255, 255, 255, 0.65);
      }
      .el-table--enable-row-hover
      .el-table__body tr:hover>td {
        background-color: rgba($color: $mainColor, $alpha: 0.02);
      }
      .el-table__body tr.hover-row.current-row>td, .el-table__body tr.hover-row.el-table__row--striped.current-row>td, .el-table__body tr.hover-row.el-table__row--striped>td, .el-table__body tr.hover-row>td {
        background-color: rgba($color: $mainColor, $alpha: 0.02);
      }
      .el-table__body tr.current-row>td {
        background-color: rgba($color: $mainColor, $alpha: 0.02);
      }
    }
  }
}

.ellipsis {
  @include ellipsis;
}
.empty, .lists {
  &::before {
    display: none;
  }
  ::v-deep {
    .el-table__empty-block {
      display: none;
    }
  }
}
</style>
