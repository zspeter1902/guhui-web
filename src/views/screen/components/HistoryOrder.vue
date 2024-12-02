<template>
  <div class="echarts-container">
    <div class="custom-button">
      <a :class="{active: type === '1'}" href="javascript:;" @click="changeType('1')">( 金额</a>
      <span> | </span>
      <a :class="{active: type === '2'}" href="javascript:;" @click="changeType('2')">单量 )</a>
      <!-- <el-radio-group v-model="type" size="mini" text-color="#024f87" fill="#cee7f9" @change="changeType">
        <el-radio-button label="1">金额</el-radio-button>
        <el-radio-button label="2">单量</el-radio-button>
      </el-radio-group> -->
    </div>
    <div ref="historyOrder" class="city-chart" :style="{height: height + 'px'}" />
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import { getOrderRatioData } from '@/api/data'
export default {
  data() {
    return {
      type: '1',
      historyOrderChart: null,
      historyOrderNumList: [],
      height: null,
      month: '',
      lastData: {},
      lastDataQuan: {},
      timer: null
    }
  },
  created() {
    this.$EventBus.$on('screen-total', res => {
      // lastDayTotal total
      if (res.lastDayTotal) {
        const month = res.lastDayTotal.yearMonth.slice(4, 6)
        this.$set(this.lastData, month, res.lastDayTotal.totalAmount)
        this.$set(this.lastDataQuan, month, res.lastDayTotal.declareNum)
      }
      this.historyOrderChart = echarts.init(this.$refs.historyOrder)
      this.getData()
    })
    this.initSize()
  },
  mounted() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer)
    }
    if (!this.historyOrderChart) {
      return
    }
    this.historyOrderChart.dispose()
    this.historyOrderChart = null
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  methods: {
    initSize() {
      const { body } = document
      const rect = body.getBoundingClientRect()
      this.height = Math.floor(((rect.height - 91 - 24 - 20) * 0.36) - 20 - 20 - 26 - 10)
    },
    changeType(val) {
      console.log(val)
      this.type = val
      if (val === '1') {
        clearInterval(this.timer)
        this.historyOrderConfigure()
      } else if (val === '2') {
        clearInterval(this.timer)
        this.historyQuantity()
      }
    },
    // 企业分类数量
    getYearMonth() {
      // 获取当前时间
      const myDate = new Date()
      myDate.setTime(myDate.getTime() - 24 * 60 * 60 * 1000)
      const yy = String(myDate.getFullYear())
      const period = {
        startTime: yy + '01',
        endTime: yy + '12',
        year: yy
      }
      return period
    },
    getData() {
      const date = this.getYearMonth()
      getOrderRatioData(date).then(res => {
        this.historyOrderChart.showLoading()
        this.historyOrderNumList = res.list
        this.historyOrderConfigure()
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
    // 企业类别分布图片配置
    historyOrderConfigure() {
      this.historyOrderChart.hideLoading()
      const data = this.historyOrderNumList
      // #EAEA26
      const { year } = this.getYearMonth()
      const currentYear = String(year)
      const lastYear = String(year - 1)
      const that = this
      const gutter = 1000 * 60 * 60 * 9
      const handleData = function(data) {
        return data.map(item => {
          if (that.lastData[item.yearMonth]) {
            const past = that.calcTimeData() > 0 ? that.calcTimeData() : 0
            const pastAmount = past > gutter ? Math.floor((gutter * that.lastData[item.yearMonth]) / gutter) : Math.floor((past * that.lastData[item.yearMonth]) / gutter)
            return ((item.totalAmount - that.lastData[item.yearMonth] + pastAmount) / 10000).toFixed(2)
          }
          return (item.totalAmount / 10000).toFixed(2)
        })
      }
      this.historyOrderChart.setOption({
        legend: {
          data: [lastYear, currentYear],
          right: 0,
          top: 0,
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          showContent: false,
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(35,201,237,0)' // 0% 处的颜色
                }, {
                  offset: 0.5,
                  color: 'rgba(35,201,237,0.6)' // 100% 处的颜色
                }, {
                  offset: 0,
                  color: 'rgba(35,201,237,0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          },
          formatter: (value) => {
            return value[0].seriesName + value[0].name + '月：' + value[0].value + '<br>' + value[1].seriesName + value[1].name + '月：' + value[1].value
          }
        },
        grid: {
          top: '24%',
          left: '2%',
          right: '2%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          axisLine: { // 坐标轴轴线相关设置。数学上的x轴
            show: false,
            lineStyle: {
              color: '#092b5d'
            }
          },
          axisLabel: { // 坐标轴刻度标签的相关设置
            textStyle: {
              color: '#24c4ff',
              margin: 15
            },
            formatter: (data) => {
              return data + '月'
            }
          },
          axisTick: {
            show: false
          },
          data: data.map(item => item.yearMonth)
        }],
        yAxis: [{
          min: 0,
          // max: 6000,
          splitLine: {
            show: false,
            lineStyle: {
              color: '#092b5d'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#092b5d'
            }
          },
          axisLabel: {
            show: true,
            formatter: '{value}万美元',
            textStyle: {
              color: '#24c4ff'
            }
          },
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: lastYear,
          type: 'line',
          symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
          showAllSymbol: true,
          symbolSize: 10,
          lineStyle: {
            normal: {
              color: '#2f93cf' // 线条颜色
            },
            borderColor: 'rgba(0,0,0,.4)'
          },
          itemStyle: {
            color: '#2f93cf',
            borderColor: '#2f93cf',
            borderWidth: 2
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: [
                ' {a|{c}}'
              ].join(','),
              rich: {
                a: {
                  color: '#2f93cf',
                  align: 'center'
                }
              }
            }
          },
          smooth: true,
          areaStyle: { // 区域填充样式
            normal: {
              // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(47, 147, 207,.3)'
              }, {
                offset: 1,
                color: 'rgba(47, 147, 207, 0)'
              }], false),
              shadowColor: 'rgba(15,64,140, 0.9)', // 阴影颜色
              shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
          },
          data: data.map(item => (item.lastTotalAmount / 10000).toFixed(2))
        }, {
          name: currentYear,
          type: 'line',
          symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
          showAllSymbol: true,
          symbolSize: 10,
          lineStyle: {
            normal: {
              color: '#CC6131' // 线条颜色23C9ED
            },
            borderColor: 'rgba(0,0,0,.4)'
          },
          itemStyle: {
            color: '#CC6131',
            borderColor: '#CC6131',
            borderWidth: 2
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: [
                ' {a|{c}}'
              ].join(','),
              rich: {
                a: {
                  color: '#CC6131',
                  align: 'center'
                }
              }
            }
          },
          smooth: true,
          areaStyle: { // 区域填充样式
            normal: {
              // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(1, 225, 126,.3)'
              }, {
                offset: 1,
                color: 'rgba(1, 225, 126, 0)'
              }], false),
              shadowColor: 'rgba(1,225,126, 0.9)', // 阴影颜色
              shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
          },
          data: handleData(data)
        }, {
          name: lastYear,
          type: 'bar',
          // barWidth: data.length > 6 ? 24 : 48,
          barMaxWidth: 36,
          itemStyle: {
            color: '#2f93cf',
            borderColor: '#2f93cf',
            borderWidth: 2
          },
          data: data.map(item => (item.lastTotalAmount / 10000).toFixed(2))
        }, {
          name: currentYear,
          type: 'bar',
          // barWidth: data.length > 6 ? 24 : 48,
          barMaxWidth: 36,
          itemStyle: {
            color: '#CC6131',
            borderColor: '#CC6131',
            borderWidth: 2
          },
          data: handleData(data)
        }]
      })
      this.$nextTick(() => {
        this.countDown()
      })
    },
    countDown() {
      clearInterval(this.timer)
      const gutter = 1000 * 60 * 60 * 9
      const lastDataArr = Object.values(this.lastData)
      const totalNum = lastDataArr.length ? lastDataArr.reduce((total, cur, idx, arr) => {
        return total + cur
      }) : 1
      const data = this.historyOrderNumList
      // #EAEA26
      const { year } = this.getYearMonth()
      const currentYear = String(year)
      const lastYear = String(year - 1)
      let i = 0
      const that = this
      const handleData = function(originData, scaleNum) {
        return originData.map(item => {
          if (that.lastData[item.yearMonth]) {
            const past = that.calcTimeData() > 0 ? that.calcTimeData() : 0
            const pastAmount = past > gutter ? Math.floor((gutter * that.lastData[item.yearMonth]) / gutter) : Math.floor((past * that.lastData[item.yearMonth]) / gutter)
            return ((item.totalAmount - that.lastData[item.yearMonth] + pastAmount) / 10000).toFixed(2)
            // return ((item.totalAmount - that.lastData[item.yearMonth] + scaleNum) / 10000).toFixed(2)
          }
          return (item.totalAmount / 10000).toFixed(2)
        })
      }
      this.timer = setInterval(() => {
        if (i > Object.values(this.lastData)[0]) {
          clearInterval(this.timer)
          return
        }
        const optionData = {
          series: [{
            name: lastYear,
            type: 'line',
            symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: '#2f93cf' // 线条颜色
              },
              borderColor: 'rgba(0,0,0,.4)'
            },
            itemStyle: {
              color: '#2f93cf',
              borderColor: '#2f93cf',
              borderWidth: 2
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: [
                  ' {a|{c}}'
                ].join(','),
                rich: {
                  a: {
                    color: '#2f93cf',
                    align: 'center'
                  }
                }
              }
            },
            smooth: true,
            areaStyle: { // 区域填充样式
              normal: {
                // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(47, 147, 207,.3)'
                }, {
                  offset: 1,
                  color: 'rgba(47, 147, 207, 0)'
                }], false),
                shadowColor: 'rgba(15,64,140, 0.9)', // 阴影颜色
                shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            data: data.map(item => (item.lastTotalAmount / 10000).toFixed(2))
          }, {
            name: currentYear,
            type: 'line',
            symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: '#CC6131' // 线条颜色23C9ED
              },
              borderColor: 'rgba(0,0,0,.4)'
            },
            itemStyle: {
              color: '#CC6131',
              borderColor: '#CC6131',
              borderWidth: 2
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: [
                  ' {a|{c}}'
                ].join(','),
                rich: {
                  a: {
                    color: '#CC6131',
                    align: 'center'
                  }
                }
              }
            },
            smooth: true,
            areaStyle: { // 区域填充样式
              normal: {
                // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(1, 225, 126,.3)'
                }, {
                  offset: 1,
                  color: 'rgba(1, 225, 126, 0)'
                }], false),
                shadowColor: 'rgba(1,225,126, 0.9)', // 阴影颜色
                shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            data: handleData(data, i)
          }, {
            name: lastYear,
            type: 'bar',
            // barWidth: data.length > 6 ? 24 : 48,
            barMaxWidth: 36,
            itemStyle: {
              color: '#2f93cf',
              borderColor: '#2f93cf',
              borderWidth: 2
            },
            data: data.map(item => (item.lastTotalAmount / 10000).toFixed(2))
          }, {
            name: currentYear,
            type: 'bar',
            // barWidth: data.length > 6 ? 24 : 48,
            barMaxWidth: 36,
            itemStyle: {
              color: '#CC6131',
              borderColor: '#CC6131',
              borderWidth: 2
            },
            data: handleData(data, i)
          }]
        }
        i++
        this.historyOrderChart.setOption(optionData)
      }, Math.ceil(gutter / totalNum))
    },
    countDownQuan() {
      clearInterval(this.timer)
      const gutter = 1000 * 60 * 60 * 9
      const lastDataArr = Object.values(this.lastDataQuan)
      const totalNum = lastDataArr.length ? lastDataArr.reduce((total, cur, idx, arr) => {
        return total + cur
      }) : 1
      const data = this.historyOrderNumList
      // #EAEA26
      const { year } = this.getYearMonth()
      const currentYear = String(year)
      const lastYear = String(year - 1)
      let i = 0
      const that = this
      const handleData = function(originData, scaleNum) {
        return originData.map(item => {
          if (that.lastDataQuan[item.yearMonth]) {
            const past = that.calcTimeData() > 0 ? that.calcTimeData() : 0
            const pastAmount = past > gutter ? Math.floor((gutter * that.lastDataQuan[item.yearMonth]) / gutter) : Math.floor((past * that.lastDataQuan[item.yearMonth]) / gutter)
            return ((item.declareNum - that.lastDataQuan[item.yearMonth] + pastAmount) / 10000).toFixed(2)
            // return ((item.totalAmount - that.lastData[item.yearMonth] + scaleNum) / 10000).toFixed(2)
          }
          return (item.declareNum / 10000).toFixed(2)
        })
      }
      this.timer = setInterval(() => {
        if (i > Object.values(this.lastData)[0]) {
          clearInterval(this.timer)
          return
        }
        const optionData = {
          series: [{
            name: lastYear,
            type: 'line',
            symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: '#2f93cf' // 线条颜色
              },
              borderColor: 'rgba(0,0,0,.4)'
            },
            itemStyle: {
              color: '#2f93cf',
              borderColor: '#2f93cf',
              borderWidth: 2
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: [
                  ' {a|{c}}'
                ].join(','),
                rich: {
                  a: {
                    color: '#2f93cf',
                    align: 'center'
                  }
                }
              }
            },
            smooth: true,
            areaStyle: { // 区域填充样式
              normal: {
                // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(47, 147, 207,.3)'
                }, {
                  offset: 1,
                  color: 'rgba(47, 147, 207, 0)'
                }], false),
                shadowColor: 'rgba(15,64,140, 0.9)', // 阴影颜色
                shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            data: data.map(item => (item.lastDeclareNum / 10000).toFixed(2))
          }, {
            name: currentYear,
            type: 'line',
            symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
            showAllSymbol: true,
            symbolSize: 10,
            lineStyle: {
              normal: {
                color: '#CC6131' // 线条颜色23C9ED
              },
              borderColor: 'rgba(0,0,0,.4)'
            },
            itemStyle: {
              color: '#CC6131',
              borderColor: '#CC6131',
              borderWidth: 2
            },
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: [
                  ' {a|{c}}'
                ].join(','),
                rich: {
                  a: {
                    color: '#CC6131',
                    align: 'center'
                  }
                }
              }
            },
            smooth: true,
            areaStyle: { // 区域填充样式
              normal: {
                // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(1, 225, 126,.3)'
                }, {
                  offset: 1,
                  color: 'rgba(1, 225, 126, 0)'
                }], false),
                shadowColor: 'rgba(1,225,126, 0.9)', // 阴影颜色
                shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              }
            },
            data: handleData(data, i)
          }, {
            name: lastYear,
            type: 'bar',
            // barWidth: data.length > 6 ? 24 : 48,
            barMaxWidth: 36,
            itemStyle: {
              color: '#2f93cf',
              borderColor: '#2f93cf',
              borderWidth: 2
            },
            data: data.map(item => (item.lastDeclareNum / 10000).toFixed(2))
          }, {
            name: currentYear,
            type: 'bar',
            // barWidth: data.length > 6 ? 24 : 48,
            barMaxWidth: 36,
            itemStyle: {
              color: '#CC6131',
              borderColor: '#CC6131',
              borderWidth: 2
            },
            data: handleData(data, i)
          }]
        }
        i++
        this.historyOrderChart.setOption(optionData)
      }, Math.ceil(gutter / totalNum))
    },
    historyQuantity() {
      this.historyOrderChart.hideLoading()
      const data = this.historyOrderNumList
      // #EAEA26
      const { year } = this.getYearMonth()
      const currentYear = String(year)
      const lastYear = String(year - 1)
      const that = this
      const gutter = 1000 * 60 * 60 * 9
      const handleData = function(data) {
        return data.map(item => {
          if (that.lastDataQuan[item.yearMonth]) {
            const past = that.calcTimeData() > 0 ? that.calcTimeData() : 0
            const pastQuan = past > gutter ? Math.floor((gutter * that.lastDataQuan[item.yearMonth]) / gutter) : Math.floor((past * that.lastDataQuan[item.yearMonth]) / gutter)
            return ((item.declareNum - that.lastDataQuan[item.yearMonth] + pastQuan) / 10000).toFixed(2)
          }
          return (item.declareNum / 10000).toFixed(2)
        })
      }
      this.historyOrderChart.setOption({
        legend: {
          data: [lastYear, currentYear],
          right: 0,
          top: 0,
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {
          trigger: 'axis',
          showContent: false,
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0,
                  color: 'rgba(35,201,237,0)' // 0% 处的颜色
                }, {
                  offset: 0.5,
                  color: 'rgba(35,201,237,0.6)' // 100% 处的颜色
                }, {
                  offset: 0,
                  color: 'rgba(35,201,237,0)' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            }
          },
          formatter: (value) => {
            return value[0].seriesName + value[0].name + '月：' + value[0].value + '<br>' + value[1].seriesName + value[1].name + '月：' + value[1].value
          }
        },
        grid: {
          top: '24%',
          left: '2%',
          right: '2%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: true,
          axisLine: { // 坐标轴轴线相关设置。数学上的x轴
            show: false,
            lineStyle: {
              color: '#092b5d'
            }
          },
          axisLabel: { // 坐标轴刻度标签的相关设置
            textStyle: {
              color: '#24c4ff',
              margin: 15
            },
            formatter: (data) => {
              return data + '月'
            }
          },
          axisTick: {
            show: false
          },
          data: data.map(item => item.yearMonth)
        }],
        yAxis: [{
          min: 0,
          // max: 6000,
          splitLine: {
            show: false,
            lineStyle: {
              color: '#092b5d'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: '#092b5d'
            }
          },
          axisLabel: {
            show: true,
            formatter: '{value}万单',
            textStyle: {
              color: '#24c4ff'
            }
          },
          axisTick: {
            show: false
          }
        }],
        series: [{
          name: lastYear,
          type: 'line',
          symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
          showAllSymbol: true,
          symbolSize: 10,
          lineStyle: {
            normal: {
              color: '#2f93cf' // 线条颜色
            },
            borderColor: 'rgba(0,0,0,.4)'
          },
          itemStyle: {
            color: '#2f93cf',
            borderColor: '#2f93cf',
            borderWidth: 2
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: [
                ' {a|{c}}'
              ].join(','),
              rich: {
                a: {
                  color: '#2f93cf',
                  align: 'center'
                }
              }
            }
          },
          smooth: true,
          areaStyle: { // 区域填充样式
            normal: {
              // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(47, 147, 207,.3)'
              }, {
                offset: 1,
                color: 'rgba(47, 147, 207, 0)'
              }], false),
              shadowColor: 'rgba(15,64,140, 0.9)', // 阴影颜色
              shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
          },
          data: data.map(item => (item.lastDeclareNum / 10000).toFixed(2))
        }, {
          name: currentYear,
          type: 'line',
          symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
          showAllSymbol: true,
          symbolSize: 10,
          lineStyle: {
            normal: {
              color: '#CC6131' // 线条颜色23C9ED
            },
            borderColor: 'rgba(0,0,0,.4)'
          },
          itemStyle: {
            color: '#CC6131',
            borderColor: '#CC6131',
            borderWidth: 2
          },
          label: {
            normal: {
              show: true,
              position: 'top',
              formatter: [
                ' {a|{c}}'
              ].join(','),
              rich: {
                a: {
                  color: '#CC6131',
                  align: 'center'
                }
              }
            }
          },
          smooth: true,
          areaStyle: { // 区域填充样式
            normal: {
              // 线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(1, 225, 126,.3)'
              }, {
                offset: 1,
                color: 'rgba(1, 225, 126, 0)'
              }], false),
              shadowColor: 'rgba(1,225,126, 0.9)', // 阴影颜色
              shadowBlur: 20 // shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
          },
          data: handleData(data)
        }, {
          name: lastYear,
          type: 'bar',
          // barWidth: data.length > 6 ? 24 : 48,
          barMaxWidth: 36,
          itemStyle: {
            color: '#2f93cf',
            borderColor: '#2f93cf',
            borderWidth: 2
          },
          data: data.map(item => (item.lastDeclareNum / 10000).toFixed(2))
        }, {
          name: currentYear,
          type: 'bar',
          // barWidth: data.length > 6 ? 24 : 48,
          barMaxWidth: 36,
          itemStyle: {
            color: '#CC6131',
            borderColor: '#CC6131',
            borderWidth: 2
          },
          data: handleData(data)
        }]
      })
      this.$nextTick(() => {
        this.countDownQuan()
      })
    },
    refresh() {
      this.getData()
    },
    $_resizeHandler() {
      this.initSize()
      this.$nextTick(() => {
        this.historyOrderChart.resize()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/styles/variables';
.custom-button {
  position: absolute;
  left: 160px;
  top: 22px;
  z-index: 10;
  .active {
    color: greenyellow;
  }
}
</style>
