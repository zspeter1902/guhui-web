<template>
  <div class="rank-box-box">
    <el-table
      :show-header="true"
      class="empty"
    >
      <el-table-column width="60" label="序号" align="center" prop="range" />
      <el-table-column label="企业" align="center" prop="companyName" />
      <el-table-column label="金额（美元）" align="right" prop="totalAmount" />
    </el-table>
    <el-scrollbar class="rank-scroll" :style="'height:' + height + 'px'">
      <!-- :default-sort="{prop: 'totalAmount', order: 'descending'}" -->
      <el-table
        ref="table"
        :key="tableKey"
        :data="lists"
        header-row-class-name="no-header"
        class="lists"
      >
        <el-table-column width="60" label="序号" align="center">
          <template slot-scope="{ $index }">{{ $index+1 }}</template>
        </el-table-column>
        <el-table-column min-width="70%" label="企业" align="left" prop="companyName">
          <template slot-scope="{ row }">
            <!-- <el-tooltip class="item" effect="dark" :content="formatterName(row.companyName)" placement="bottom"> -->
            <span class="ellipsis block">{{ formatterName(row.companyName) }}</span>
            <!-- </el-tooltip> -->
          </template>
        </el-table-column>
        <!-- :formatter="formatterAmount" -->
        <el-table-column min-width="30%" label="金额" align="right" prop="totalAmount">
          <template slot-scope="{ row }">
            <countTo
              class="value"
              :start-val="formatterNumber(row.startAmount)"
              :end-val="formatterNumber(row.totalAmount)"
              :duration="durationFull"
              :easing-fn="easingFn"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-scrollbar>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
import { getOrderRankData } from '@/api/data'
export default {
  components: { countTo },
  data() {
    return {
      height: 10,
      tableKey: true,
      duration1: 1000 * 60 * 60 * 9,
      durationFull: 6000,
      lists: [],
      lastData: {},
      timer: null,
      // temp: {}
    }
  },
  created() {
    this.$EventBus.$on('screen-total', res => {
      // lastDayTotal total
      if (res.lastDayList) {
        for (const item of res.lastDayList) {
          this.$set(this.lastData, item.companyId, item.totalAmount)
        }
        // this.temp = res.lastDayList[0]
      }
      this.$nextTick(() => {
        this.getData()
      })
    })
  },
  mounted() {
    this.initSize()
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  methods: {
    easingFn(t, b, c, d) {
      const y = c * t / d + b
      return y
    },
    formatterName(name) {
      let str = ''
      if (!name) return ''
      for (let i = 0; i < name.length; i++) {
        if (name.includes('汇添')) {
          if (i > 1 && i < 4) {
            str += '*'
          } else if (i >= 4 && i < 6) {
            str += ''
          } else {
            str += name[i]
          }
        } else {
          if (i > 1 && i < 4) {
            str += '*'
          } else {
            str += name[i]
          }
        }
      }
      return str
    },
    refresh() {
      this.getData()
    },
    getData() {
      const date = this.getYearMonth()
      getOrderRankData(date).then(res => {
        const gutter = this.duration1
        const past = this.calcTimeData() > 0 ? this.calcTimeData() : 0
        // res.list.unshift(this.temp)
        for (const item of res.list) {
          const obj = item
          obj.totalAmount2 = obj.totalAmount
          obj.startAmount = 0
          if (this.lastData[item.companyId]) {
            const pastAmount = past > gutter ? Math.floor((gutter * this.lastData[item.companyId]) / gutter) : Math.floor((past * this.lastData[item.companyId]) / gutter)
            obj.totalAmount = obj.totalAmount2 - this.lastData[item.companyId] + pastAmount
            this.lists.unshift(obj)
          } else {
            this.lists.push(obj)
          }
        }
        this.$nextTick(() => {
          this.countDown()
        })
      })
    },
    calcTimeData() {
      const myDate = new Date()
      const yy = String(myDate.getFullYear())
      const mm = String(myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1))
      const dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
      const startTime = new Date(yy + '-' + mm + '-' + dd + ' 08:30:00') // 开始时间
      const endTime = new Date() // 结束时间
      return Math.floor((endTime - startTime))
    },
    countDown() {
      const gutter = this.duration1
      setTimeout(() => {
        const past = this.calcTimeData() > 0 ? this.calcTimeData() : 0
        this.durationFull = past - gutter > 0 ? 6000 : gutter - past
        this.lists = this.lists.map(item => {
          if (this.lastData[item.companyId]) {
            item.startAmount = item.totalAmount
            item.totalAmount = item.totalAmount2
            return item
          }
          item.startAmount = item.totalAmount
          item.totalAmount = item.totalAmount2
          return item
        })
        this.tableKey = Math.random()
      }, 8000)
    },
    initSize() {
      const { body } = document
      const rect = body.getBoundingClientRect()
      this.height = Math.floor(((rect.height - 91 - 24 - 20) * 0.36) - 20 - 20 - 26 - 10 - 46)
    },
    $_resizeHandler() {
      this.initSize()
    },
    formatterAmount(cellValue) {
      return (cellValue.totalAmount / 10000).toFixed(2)
    },
    formatterNumber(val) {
      return Number(val)
    },
    getYearMonth() {
      // 获取当前时间
      const myDate = new Date()
      const yy = String(myDate.getFullYear())
      const period = {
        startTime: yy + '01',
        endTime: yy + '12',
        year: yy
      }
      return period
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
@import '~@/styles/mixin';

.rank-box-box {
  ::v-deep {
    .el-scrollbar__wrap {
      overflow-x: hidden;
      overflow-y: auto;
    }
    .el-table {
      background-color: transparent;
      .no-header {
        display: none;
      }
      .el-table__header-wrapper{
        margin-bottom: 5px;
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
        padding: 6px 0;
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
