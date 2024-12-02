<template>
  <div class="echarts-container">
    <div ref="historyOrder" class="city-chart" :style="{height: height + 'px'}" />
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import { getOrderRatioData } from '@/api/data'
export default {
  data() {
    return {
      historyOrderChart: null,
      historyOrderNumList: [],
      height: null
    }
  },
  created() {
    this.initSize()
  },
  mounted() {
    this.getData()
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
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
      this.height = ((rect.height - 91 - 24) * 0.36) - 18 - 20 - 20 - 26 - 10
    },
    // 企业分类数量
    getData() {
      getOrderRatioData().then(res => {
        this.historyOrderNumList = res.list
        this.historyOrderChart = echarts.init(this.$refs.historyOrder)
        this.historyOrderConfigure()
      })
    },
    // 企业类别分布图片配置
    historyOrderConfigure() {
      this.historyOrderChart.showLoading()
      this.historyOrderChart.hideLoading()
      const scaleData = this.historyOrderNumList
      const rich = {
        white: {
          color: '#EAEA26',
          align: 'center',
          fontSize: 14,
          padding: [5, 0]
        }
      }
      const placeHolderStyle = {
        normal: {
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          color: 'rgba(0, 0, 0, 0)',
          borderColor: 'rgba(0, 0, 0, 0)',
          borderWidth: 0
        }
      }
      const data = []
      const color = ['#00ffff', '#00cfff', '#006ced', '#ffe000', '#ffa800', '#ff5b00', '#ff3000']
      // const color = ['#EAEA26', '#906BF9', '#FE5656', '#01E17E', '#3DD1F9', '#FFAD05', '#4465fc']
      for (let i = 0; i < scaleData.length; i++) {
        data.push({
          value: scaleData[i].lastTotalAmount,
          name: scaleData[i].yearMonth,
          itemStyle: {
            normal: {
              borderWidth: 6,
              shadowBlur: 10,
              borderColor: color[i],
              shadowColor: color[i]
            }
          }
        }, {
          value: 2,
          name: '',
          itemStyle: placeHolderStyle
        })
      }
      this.historyOrderChart.setOption({
        series: [{
          name: '',
          type: 'pie',
          clockWise: false,
          radius: ['54%', '56%'],
          center: ['50%', '50%'],
          minAngle: 10, // 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
          avoidLabelOverlap: true, // 是否启用防止标签重叠策略
          hoverAnimation: false,
          itemStyle: {
            normal: {
              label: {
                show: true,
                position: 'outside',
                color: '#ddd',
                fontSize: 14,
                // margin: [5, 0],
                formatter: (params) => {
                  let percent = 0
                  let total = 0
                  for (let i = 0; i < scaleData.length; i++) {
                    total += scaleData[i].count
                  }
                  percent = ((params.value / total) * 100).toFixed(0)
                  if (params.name !== '') {
                    return params.name + '\n{white|' + '占比' + percent + '%}'
                  } else {
                    return ''
                  }
                },
                rich: rich
              },
              labelLine: {
                length: 25,
                length2: 15,
                show: true,
                color: '#00ffff'
              }
            }
          },
          data: data
        }]
      })
    },
    $_resizeHandler() {
      this.$nextTick(() => {
        this.historyOrderChart.resize()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
