<template>
  <div class="echarts-container">
    <div ref="companyType" class="city-chart" :style="{height: height + 'px'}" />
  </div>
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/pie'
import { getCompanyTypeData } from '@/api/data'
export default {
  data() {
    return {
      companyTypeChart: null,
      companyTypeNumList: [],
      height: null
    }
  },
  created() {
    this.initSize()
  },
  mounted() {
    this.companyTypeChart = echarts.init(this.$refs.companyType)
    this.getData()
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    if (!this.companyTypeChart) {
      return
    }
    this.companyTypeChart.dispose()
    this.companyTypeChart = null
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  methods: {
    initSize() {
      const { body } = document
      const rect = body.getBoundingClientRect()
      this.height = Math.floor(((rect.height - 91 - 24 - 150) * 0.68) - 18 - 20 - 20 - 26 - 20)
    },
    // 企业分类数量
    getData() {
      getCompanyTypeData().then(res => {
        this.companyTypeNumList = res.list
        this.companyTypeChart.showLoading()
        this.companyTypeConfigure()
      })
    },
    refresh() {
      this.getData()
    },
    // 企业类别分布图片配置
    companyTypeConfigure() {
      this.companyTypeChart.hideLoading()
      const scaleData = this.companyTypeNumList
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
      let total = 0
      // const color = ['#EAEA26', '#906BF9', '#FE5656', '#01E17E', '#3DD1F9', '#FFAD05', '#4465fc']
      for (let i = 0; i < scaleData.length; i++) {
        total += scaleData[i].count
        data.push({
          value: scaleData[i].count,
          name: scaleData[i].companyTypeName,
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
      this.companyTypeChart.setOption({
        title: {
          text: `{a|入驻企业数量} {b|${total}} {a|家}`,
          top: 0,
          left: 'left',
          textStyle: {
            color: '#CC6131',
            fontWeight: 'normal',
            rich: {
              a: {
                fontSize: 14,
                color: '#fff'
              },
              b: {
                fontSize: 24,
                color: '#CC6131',
                fontWeight: 'bold'
              }
            }
          }
        },
        series: [{
          name: '',
          type: 'pie',
          clockWise: false,
          radius: ['50%', '52%'],
          center: ['50%', '50%'],
          minAngle: 12, // 最小的扇区角度（0 ~ 360），用于防止某个值过小导致扇区太小影响交互
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
                  percent = ((params.value / total) * 100).toFixed(2)
                  if (params.name !== '') {
                    return params.name + '\n{white|' + '占比' + percent + '%}'
                  } else {
                    return ''
                  }
                },
                rich: rich
              },
              labelLine: {
                length: 18,
                length2: 12,
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
      this.initSize()
      this.$nextTick(() => {
        this.companyTypeChart.resize()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
