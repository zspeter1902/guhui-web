<template>
  <div class="echarts-container">
    <div ref="tradeMode" class="city-chart" :style="{height: height + 'px'}" />
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/bar'
import { getTradeData } from '@/api/data'
export default {
  data() {
    return {
      tradeModeChart: null,
      tradeModeNumList: [],
      typeMap: {},
      height: null
    }
  },
  created() {
    this.initSize()
  },
  mounted() {
    this.tradeModeChart = echarts.init(this.$refs.tradeMode)
    this.getData()
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    if (!this.tradeModeChart) {
      return
    }
    this.tradeModeChart.dispose()
    this.tradeModeChart = null
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  methods: {
    initSize() {
      const { body } = document
      const rect = body.getBoundingClientRect()
      this.height = Math.floor(((rect.height - 91 - 24 - 150) * 0.32) - 18 - 20 - 20 - 26 - 10)
    },
    // 企业分类数量
    getData() {
      getTradeData().then(res => {
        this.tradeModeNumList = res.list
        this.tradeModeChart.showLoading()
        this.tradeModeConfigure()
      })
      // order_type
      // getDictMap('order_type').then(res => {
      //   this.typeMap = res.data
      // })
    },
    // 企业类别分布图片配置
    tradeModeConfigure() {
      this.tradeModeChart.hideLoading()
      const scaleData = this.tradeModeNumList
      const data = []
      const color = ['rgba(47,147,207', 'rgba(255,91,6', 'rgba(100,255,249', 'rgba(248,195,248', 'rgba(110,234,19', 'rgba(255,168,17', 'rgba(218,111,227']
      const typeMap = {
        'E': '9610',
        'B': '9710',
        'W': '9810'
      }
      // const color = ['#EAEA26', '#906BF9', '#FE5656', '#01E17E', '#3DD1F9', '#FFAD05', '#4465fc']
      for (let i = 0; i < scaleData.length; i++) {
        let x = i
        if (x > color.length - 1) {
          x = color.length - 1
        }
        data.push({
          value: scaleData[i].exportCount,
          // name: scaleData[i].ieFlagName,
          name: typeMap[scaleData[i].ieFlag],
          color: color[x] + ')',
          itemStyle: {
            show: true,
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                offset: 0,
                color: color[x] + ', 0.3)'
              }, {
                offset: 1,
                color: color[x] + ', 1)'
              }], false),
              barBorderRadius: 10
            },
            emphasis: {
              shadowBlur: 15,
              shadowColor: 'rgba(0, 0, 0, 0.1)'
            }
          }
        })
      }
      this.tradeModeChart.setOption({
        color: color,
        tooltip: {
          trigger: 'item'
        },
        grid: {
          borderWidth: 0,
          top: '5%',
          left: '2%',
          right: '2%',
          bottom: '0%',
          containLabel: true
        },
        xAxis: [{
          type: 'value',
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: { // 坐标轴刻度标签的相关设置
            show: false
          }
        }],
        yAxis: [{
          type: 'category',
          inverse: true,
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: true,
            inside: false,
            textStyle: {
              color: '#b3ccf8',
              fontSize: 14
            }
          },
          data: data.map(item => item.name)
        }, {
          type: 'category',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            inside: false,
            textStyle: {
              color: '#b3ccf8',
              fontSize: 14
            },
            formatter: (val) => {
              return `${val}票` // 票、单
            }
          },
          splitArea: {
            show: false
          },
          splitLine: {
            show: false
          },
          data: data.map(item => item.value).reverse()
        }],
        series: [{
          name: '',
          type: 'bar',
          zlevel: 2,
          barWidth: '12px',
          data: data,
          animationDuration: 1500,
          label: {
            normal: {
              color: '#b3ccf8',
              show: false,
              position: [0, '-15px'],
              textStyle: {
                fontSize: 14
              },
              formatter: (a, b) => {
                return a.name
              }
            }
          }
        }]
      })
    },
    refresh() {
      this.getData()
    },
    $_resizeHandler() {
      this.initSize()
      this.$nextTick(() => {
        this.tradeModeChart.resize()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
