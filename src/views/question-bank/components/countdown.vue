<template>
  <div class="text-center countdown">
    <span>{{ countdown }}</span>
  </div>
</template>

<script>
import { getQuestionRank } from '@/api/content'
export default {
  props: {
    total: {
      type: Number,
      default: 60
    },
    startTime: {
      type: Date,
      default: ''
    },
    doTime: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      countdown: '',
      hours: 0,
      minutes: 0,
      seconds: 0,
      timer: null
    }
  },
  computed: {
    remainingTime() {
      return this.hours * 60 + this.minutes
    }
  },
  destroyed() {
    // 退出后清除计时器
    this.clearTime()
  },
  methods: {
    init() {
      this.parseTime()
    },
    clearTime(bull) {
      if (this.timer) {
        clearInterval(this.timer)
        if (bull) {
          this.$emit('remaining', this.remainingTime)
        }
      }
    },
    difference() {
      var dateBegin = new Date(this.time[0])
      var dateEnd = new Date(this.time[this.time.length - 1])
      var dateDiff = dateEnd.getTime() - dateBegin.getTime() // 时间差的毫秒数
      var dayDiff = Math.floor(dateDiff / (24 * 3600 * 1000)) // 计算出相差天数
      var leave1 = dateDiff % (24 * 3600 * 1000) // 计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000)) // 计算出小时数
      // 计算相差分钟数
      var leave2 = leave1 % (3600 * 1000) // 计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000)) // 计算相差分钟数
      // 计算相差秒数
      var leave3 = leave2 % (60 * 1000) // 计算分钟数后剩余的毫秒数
      var seconds = Math.round(leave3 / 1000)
      return (
        this.padStart(dayDiff * 24 + hours) +
        '-' +
        this.padStart(minutes) +
        '-' +
        this.padStart(seconds)
      )
    },
    // 补零
    padStart(time) {
      return time.toString().padStart(2, '0')
    },
    // 获取倒计时
    parseTime() {
      // this.total
      if (this.total) {
        this.hours = Math.floor(this.total / 60)
        this.minutes = Math.floor(this.total % 60)
        this.seconds = 0
        this.handleCountDown()
      } else {
        this.countdown = '已结束'
      }
    },
    // 当前排名
    // getRank(id) {
    //   getQuestionRank({
    //     actId: id,
    //     orderCol: 'win_score',
    //     orderType: 'DESC'
    //   }).then(res => {

    //   })
    // },
    handleCountDown(id) {
      // this.getRank(id)
      this.timer = setInterval(() => {
        if (this.hours !== 0) {
          if (this.minutes === 0 && this.seconds === 0) {
            this.seconds = 59
            this.minutes = 59
            this.hours -= 1
          } else if (this.seconds !== 0) {
            this.seconds -= 1
          } else if (this.minutes !== 0 && this.seconds === 0) {
            this.minutes -= 1
            this.seconds = 59
          }
        } else {
          if (this.minutes === 0 && this.seconds === 0) {
            this.seconds = 0
            this.clearTime()
          } else if (this.seconds !== 0) {
            this.seconds -= 1
          } else if (this.minutes !== 0 && this.seconds === 0) {
            this.minutes -= 1
            this.seconds = 59
          }
        }
        this.countdown =
          this.padStart(this.hours) +
          ':' +
          this.padStart(this.minutes) +
          ':' +
          this.padStart(this.seconds)
      }, 1000)
    }
  }
}
</script>
<style lang="scss" scoped>
@import '~@/styles/variables';
.countdown {
  position: relative;
  margin: 20px 0;
  font-size: 24px;
  line-height: 30px;
  font-weight: bold;
  color: $mainColor;
}
</style>
