<template>
  <el-row type="flex" justify="space-between" class="total-box text-center">
    <div class="line">
      <span class="block block1" />
      <!-- <span class="block block2" /> -->
    </div>
    <el-col :span="12">
      <countTo
        class="value"
        :start-val="startAmount"
        :end-val="orderAmount"
        :duration="durationFull"
        :easing-fn="easingFn"
      />
      <p class="unit">美元</p>
      <h5 class="name">累计出口金额</h5>
    </el-col>
    <el-col :span="12">
      <countTo
        class="value"
        :start-val="startNum"
        :end-val="orderNum"
        :duration="duration"
        :easing-fn="easingFn"
      />
      <p class="unit">单</p>
      <h5 class="name">累计出口单量</h5>
    </el-col>
  </el-row>
</template>

<script>
import countTo from 'vue-count-to'
import { getOrderTotalData } from '@/api/data'
export default {
  components: { countTo },
  data() {
    return {
      startAmount: 0,
      startNum: 0,
      duration: 6000,
      duration1: 6000 * 10 * 60 * 9,
      durationFull: 6000,
      orderAmount: null,
      orderNum: null,
      timer: null
    }
  },
  created() {
  },
  mounted() {
    this.getData()
  },
  beforeDestroy() {
    if (this.timer) {
      setInterval(this.timer) // 在Vue实例销毁前，清除时间定时器
    }
  },
  methods: {
    easingFn(t, b, c, d) {
      const y = c * t / d + b
      return y
    },
    getYearMonthDay() {
      // 获取当前时间
      const myDate = new Date()
      myDate.setTime(myDate.getTime() - 24 * 60 * 60 * 1000)
      const yy = String(myDate.getFullYear())
      const mm = String(myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1))
      const dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
      return {
        date: yy + mm + dd
      }
    },
    calcTimeData(time) {
      const myDate = new Date()
      const yy = String(myDate.getFullYear())
      const mm = String(myDate.getMonth() + 1 < 10 ? '0' + (myDate.getMonth() + 1) : (myDate.getMonth() + 1))
      const dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
      const startTime = new Date(yy + '-' + mm + '-' + dd + ' 08:30:00') // 开始时间
      const endTime = time ? new Date(yy + '-' + mm + '-' + dd + ' ' + time) : new Date() // 结束时间
      return Math.floor((endTime - startTime))
    },
    getData() {
      const { date } = this.getYearMonthDay()
      getOrderTotalData(date, date).then(res => {
        // 临时加的数据，需要删除 start
        // this.orderAmount = res.total.totalAmount - lastAmount + pastAmount - 100000
        // this.orderNum = res.total.declareNum - lastDeclare + pastNum - 5000
        // res['lastDayTotal'] = {}
        // res['lastDayList'].push({ companyId: 23, companyName: '合肥中星汇添信息科技有限公司', totalAmount: 50000, country: '502', declareNum: 32000, createTime: '2023-10-08 10:16:51' })
        // res['lastDayTotal']['totalAmount'] = 650000
        // res['lastDayTotal']['declareNum'] = 32000
        // res['lastDayTotal']['yearMonth'] = '20231008'
        // 临时加的数据，需要删除 end
        const lastAmount = res.lastDayTotal?.totalAmount || 0
        const lastDeclare = res.lastDayTotal?.declareNum || 0
        // const lastDeclare = res.lastDayTotal?.declareNum && Math.max(2000, res.lastDayTotal?.declareNum) || 0
        const past = this.calcTimeData() > 0 ? this.calcTimeData() : 0
        const pastAmount = past > this.duration1 ? Math.ceil((this.duration1 * lastAmount) / this.duration1) : Math.ceil((past * lastAmount) / this.duration1)
        const pastNum = past > this.duration1 ? Math.floor((this.duration1 * lastDeclare) / this.duration1) : Math.floor((past * lastDeclare) / this.duration1)
        this.orderAmount = res.total.totalAmount - lastAmount + pastAmount
        this.orderNum = res.total.declareNum - lastDeclare + pastNum
        this.$EventBus.$emit('screen-total', res)
        this.countDown(res.total, past)
        // setTimeout(() => {
        //   this.durationFull = this.duration1 - past > 0 ? this.duration1 - past : 6000
        //   this.$nextTick(() => {
        //     this.startAmount = this.orderAmount
        //     this.startNum = this.orderNum
        //     this.orderAmount = res.total.totalAmount
        //     this.orderNum = res.total.declareNum
        //   })
        // }, 8000)
      })
    },
    countDown(res, pasted) {
      clearInterval(this.timer)
      const past = this.calcTimeData('17:30:00') > 0 ? Math.max(this.calcTimeData('17:30:00') - pasted, 0) : 0
      // 判断两个数据近乎相等
      const totalAmount = res.totalAmount - this.orderAmount
      const totalNum = res.declareNum - this.orderNum
      const gutter = totalNum ? Math.ceil(past / totalNum) : 10
      // 首次 start
      if (res.declareNum - this.orderNum > 0) {
        this.durationFull = Math.max(gutter - 600, 600)
        this.duration = Math.min(gutter, 100)
        this.startNum = this.orderNum
        this.orderNum = this.orderNum + 1
        this.startAmount = this.orderAmount
        this.orderAmount = Math.min(this.orderAmount + Math.ceil(totalAmount / totalNum), res.totalAmount)
      }
      // end
      this.timer = setInterval(() => {
        if (res.declareNum - this.orderNum <= 0) {
          clearInterval(this.timer)
          this.startNum = this.orderNum
          this.startAmount = this.orderAmount
          this.orderNum = res.declareNum
          this.orderAmount = res.totalAmount
          return
        }
        this.durationFull = Math.max(gutter - 600, 600)
        this.duration = Math.min(gutter, 100)
        this.startNum = this.orderNum
        this.startAmount = this.orderAmount
        this.orderNum = this.orderNum + 1
        this.orderAmount = Math.min(this.orderAmount + Math.ceil(totalAmount / totalNum), res.totalAmount)
      }, gutter)
    },
    refresh() {
      this.getData()
    }
  }
}
</script>

<style lang="scss" scoped>
.total-box {
  padding: 18px 0;
  .value {
    position: relative;
    font-size: 30px; // 36
    font-weight: bold;
    color: #CC6131;
    line-height: 42px;
    // font-family: DIGITALDREAMFAT;
  }
  .unit {
    margin: 1px 0;
    color: rgba(2, 234, 255, 0.6);
    font-size: 12px;
    line-height: 24px;
  }
  .name {
    position: relative;
    font-size: 14px; // 18
    color: rgba($color: #fff, $alpha: .8);
    line-height: 24px;
    // background: linear-gradient(78deg, #149CDC 0%, #2DEAF8 100%);
    // -webkit-background-clip: text;
    // -webkit-text-fill-color: transparent;
  }
}

.line {
  position: absolute;
  top: 0;
  // max-width: 520px;
  width: 100%;
  height: 100%;
  .block {
    position: absolute;
    top: 25%;
    width: 2px;
    height: 50%;
    opacity: 0.2;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      height: 100%;
      width: 1px;
      background: linear-gradient(90deg, rgba(26, 89, 251, 0.2) 0%, #1B65FC 100%);
      box-shadow: 0px 0px 20px 0px #02EAFF inset;
    }
  }
  .block1 {
    left: 50%;
  }
  .block2 {
    left: 66.666666%;
  }
}
</style>
