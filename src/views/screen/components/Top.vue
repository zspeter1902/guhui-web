<template>
  <header class="header">
    <div class="line line-left">
      <span class="block block1" />
      <span class="block block2" />
      <span class="block block3" />
      <span class="block block4" />
      <span class="block block5" />
    </div>
    <div class="line line-right">
      <span class="block block1" />
      <span class="block block2" />
      <span class="block block3" />
      <span class="block block4" />
      <span class="block block5" />
    </div>
    <el-row type="flex" align="middle" justify="space-around">
      <!-- 天气 -->
      <el-row type="flex" align="bottom" class="weather">
        <img :src="weatherIcon">
        <span class="temperature">{{ weatherData.temperature }}°C</span>
        <span class="weather-name">{{ weatherData.weather }}</span>
      </el-row>
      <!-- 安徽跨境公服数据大屏 -->
      <div class="title">安徽省跨境电商创新服务中心可视化平台</div>
      <!-- <div class="title">合肥综试区线上综合服务平台</div> -->
      <!-- 当前时间 -->
      <el-row class="time" type="flex" align="middle" justify="center">
        <!-- 天气 -->
        <!-- 分秒 -->
        <span class="now-time">{{ nowTime }}</span>
        <!-- 星期 -->
        <div class="text-right">
          <p class="now-week">{{ nowWeek }}</p>
          <p class="now-date">{{ nowDate }}</p>
        </div>
      </el-row>
    </el-row>
    <!-- <el-button v-if="!isFullScreen" class="btn-fullscreen" type="primary" size="small" @click="fullScreenLoad">{{ isFullScreen ? '退出全屏' : '全屏' }}</el-button> -->
  </header>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      isFullScreen: false,
      nowWeek: '',
      nowDate: '',
      nowTime: '',
      weatherData: {},
      weatherIcon: '',
      timer: null,
      weatherTimer: null
    }
  },
  created() {
    // 监听各浏览器fullscreenchange 事件处理
    document.addEventListener('fullscreenchange', () => {
      this.isFullScreen = !this.isFullScreen
    })
    document.addEventListener('mozfullscreenchange', () => {
      this.isFullScreen = !this.isFullScreen
    })
    document.addEventListener('webkitfullscreenchange', () => {
      this.isFullScreen = !this.isFullScreen
    })
    document.addEventListener('msfullscreenchange', () => {
      this.isFullScreen = !this.isFullScreen
    })
  },
  mounted() {
    // 时间与天气
    this.getWeather()
    this.timer = setInterval(() => {
      this.getWeather()
    }, 1000 * 60 * 60)
    this.timeFormate()
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除时间定时器
      this.timer = null
    }
    if (this.weatherTimer) {
      clearInterval(this.weatherTimer)
      this.weatherTimer = null
    }
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  methods: {
    getWeather() { // 第三方天气api接口
      if (this.timer) {
        this.$emit('refresh')
      }
      axios.get('https://restapi.amap.com/v3/weather/weatherInfo', {
        params: {
          key: '14476101b9f8b20b953a622af5999e20',
          city: '340104', // 合肥蜀山区
          extensions: 'base'
        }
      }).then(res => {
        // res.data.lives
        if (res.data) {
          const data = res.data.lives[0]
          // 温度
          this.$set(this.weatherData, 'temperature', data.temperature)
          // 天气
          this.$set(this.weatherData, 'weather', data.weather)
          if (data.weather.includes('雪')) {
            this.weatherIcon = require('../img/xue.png')
          } else if (data.weather.includes('阴')) {
            this.weatherIcon = require('../img/yin.png')
          } else if (data.weather.includes('雨') || data.weather.includes('冰雹')) {
            this.weatherIcon = require('../img/yu.png')
          } else if (data.weather.includes('云')) {
            this.weatherIcon = require('../img/yun.png')
          } else if (data.weather.includes('雾')) {
            this.weatherIcon = require('../img/wu.png')
          } else if (data.weather.includes('沙尘')) {
            this.weatherIcon = require('../img/shachen.png')
          } else if (data.weather.includes('雷')) {
            this.weatherIcon = require('../img/lei.png')
          } else {
            this.weatherIcon = require('../img/qing.png')
          }
          // 风力 单位级
          this.$set(this.weatherData, 'wind', data.windpower)
        }
      }).catch(err => {
        console.log(err)
      })
    },
    timeFormate() {
      // this.setNowTimes()
      // this.weatherTimer = setInterval(this.timeFormate, 1000)
      window.requestAnimationFrame(this.setNowTimes)
    },
    setNowTimes() {
      clearInterval(this.weatherTimer)
      this.weatherTimer = null
      // 获取当前时间
      const myDate = new Date()
      const wk = myDate.getDay()
      const yy = String(myDate.getFullYear())
      const mm = myDate.getMonth() + 1
      const dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
      const hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())
      const min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
      const ss = String(myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds())
      const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      const week = weeks[wk]
      this.nowDate = yy + '.' + mm + '.' + dd
      this.nowTime = hou + ':' + min + ':' + ss
      this.nowWeek = week
      window.requestAnimationFrame(this.setNowTimes)
    },
    $_resizeHandler() {
      const fullscreenElement = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement
      this.isFullScreen = fullscreenElement !== null
    },
    fullScreenLoad() {
      if (this.isFullScreen) {
        // 退出全屏
        if (document.exitFullscreen) {
          document.exitFullscreen()
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen()
        }
      } else {
        // 全屏显示
        if (document.body.requestFullscreen) {
          document.body.requestFullscreen()
        } else if (document.body.mozRequestFullScreen) {
          document.body.mozRequestFullScreen()
        } else if (document.body.webkitRequestFullScreen) {
          document.body.webkitRequestFullScreen()
        } else if (document.body.msRequestFullscreen) {
          document.body.msRequestFullscreen()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  overflow: hidden;
  z-index: 2;
  .btn-fullscreen {
    position: absolute;
    right: 30px;
    bottom: 0;
    min-width: 80px;
    padding: 8px 15px;
  }
  .time {
    width: 20%;
    align-self: flex-end;
    font-family: 'PingFang-SC-Medium', 'PingFang SC';
    font-size: 14px;
    line-height: 20px;
    color: rgba(47, 147, 207, .8);
  }
  .now-time {
    width: 120px;
    margin-right: 16px;
    font-size: 28px;
    line-height: 40px;
  }
  .weather {
    width: 20%;
    margin-top: 10px;
    font-size: 20px;
    color: rgba(47, 147, 207, .8);
    img {
      width: 36px;
    }
    span {
      display: inline-block;
    }
    .temperature {
      margin: 0 8px 0 16px;
    }
  }
}
.line {
  position: absolute;
  top: 0;
  // max-width: 520px;
  width: 32%;
  height: 16px;
  background: linear-gradient(180deg, rgba(31, 75, 167, 0.2) 0%, #0f408c 100%);
  box-shadow: 0px 0px 30px 0px #2f93cf inset;
  opacity: 0.2;
  .block {
    position: absolute;
    top: 31px;
    width: 32px;
    height: 35px;
    opacity: 0.8;
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      height: 100%;
      width: 16px;
      background: linear-gradient(180deg, rgba(31, 75, 167, 0.2) 0%, #0f408c 100%);
      box-shadow: 0px 0px 20px 0px #2f93cf inset;
    }
  }
  &-left {
    left: -4%;
    transform: skewX(25deg);
    transform-origin: center center;
    .block {
      &::after {
        right: 0;
      }
    }
    @for $i from 1 through 5 {
      .block#{$i} {
        right: (32px * $i);
        @if $i % 3 == 0 {
          opacity: 0.4;
        }
      }
    }
  }
  &-right {
    right: -4%;
    transform: skewX(-25deg);
    transform-origin: center center;
    .block {
      &::after {
        left: 0;
      }
    }
    @for $i from 1 through 5 {
      .block#{$i} {
        left: (32px * $i);
        @if $i % 3 == 0 {
          opacity: 0.4;
        }
      }
    }
  }
}
.title {
  position: relative;
  // max-width: 436px;
  width: 48%;
  height: 91px;
  // margin: auto;
  padding-top: 20px;
  font-size: 36px;
  font-family: PingFang-SC-Medium, PingFang SC;
  font-weight: 500;
  color: #23C9ED;
  line-height: 50px;
  background: linear-gradient(78deg, #2f93cf 0%, #beeaf8 100%);
  text-align: center;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 90%;
    height: 100%;
    margin: auto;
    transform: perspective(0.5em) rotateX(-3deg);
    transform-origin: center center;
    background: linear-gradient(180deg, rgba(26, 89, 251, 0.2) 0%, #1B65FC 100%);
    box-shadow: 0px 0px 50px 0px #02EAFF inset;
    opacity: 0.2;
  }
}

::v-deep {
  .el-scrollbar__wrap {
    overflow-x: hidden;
    overflow-y: auto;
  }
  .el-button--primary {
    background: linear-gradient(90deg, #351FFF 0%, #206FFF 100%);
    border-image: linear-gradient(90deg, #351FFF 0%, #206FFF 100%);
  }
  .el-button--primary:hover, .el-button--primary:focus {
    background: linear-gradient(90deg, rgba(53, 31, 255, 0.8) 0%, rgba(32, 110, 255, 0.8) 100%);
    border-image: linear-gradient(90deg, rgba(53, 31, 255, 0.8) 0%, rgba(32, 110, 255, 0.8) 100%);
  }
}
</style>
