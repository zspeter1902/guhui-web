<template>
  <div ref="map" class="map-echart" :style="{height: mapHeight + 'px'}" />
</template>

<script>
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/map'
import 'echarts/map/js/world.js'
// import world from 'echarts/map/json/world.json'
import area from '../world.json'
import { getCountryData } from '@/api/data'
export default {
  data() {
    return {
      mapChart: null,
      mapData: [],
      lastData: {},
      mapHeight: 300,
      timer: null
    }
  },
  created() {
    this.$EventBus.$on('screen-total', res => {
      // lastDayTotal total
      if (res.lastDayList) {
        for (const item of res.lastDayList) {
          if (this.lastData[item.country]) {
            this.$set(this.lastData, item.country, this.lastData[item.country] + item.declareNum)
          } else {
            this.$set(this.lastData, item.country, item.declareNum)
          }
        }
      }
      this.$nextTick(() => {
        this.getMap()
      })
    })
  },
  mounted() {
    this.initSize()
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    if (!this.mapChart) {
      return
    }
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.mapChart.dispose()
    this.mapChart = null
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  methods: {
    getMap() {
      getCountryData().then(res => {
        this.mapData = res.data.sort((a, b) => b.countryCount - a.countryCount).splice(0, 30)
        this.mapChart = echarts.init(this.$refs.map)
        this.mapChart.showLoading()
        // const num = res.data.reduce((total, cur) => {
        //   total = total + cur.countryCount
        //   return total
        // }, 0)
        // console.log(num)
        this.mapConfigure()
      })
    },
    initSize() {
      const { body } = document
      const rect = body.getBoundingClientRect()
      this.mapHeight = Math.floor(((rect.height - 91 - 24 - 20) * 0.64) - 20)
    },
    $_resizeHandler() {
      this.initSize()
      this.$nextTick(() => {
        this.mapChart && this.mapChart.resize()
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
      clearInterval(this.timer)
      const gutter = 1000 * 60 * 60 * 9
      const totalNum = Math.max(...Object.values(this.lastData), 1)
      // 小飞机图标
      const iconPath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
      const color = ['#beeaf8', '#CC6131', '#e6ac53']
      // 定义
      const geoCoordMap = area.cp
      // 飞线点
      const point = this.mapData
      const that = this
      // 获取地图中起点和终点的坐标，以数组形式保存下来
      var convertData = function(data) {
        const res = []
        for (let i = 0; i < data.length; i++) {
          const dataItem = data[i]
          const fromCoord = [117.283042, 31.86119]
          const toCoord = geoCoordMap[dataItem.countryName]
          if (toCoord && fromCoord) {
            res.push([{
              coord: fromCoord // 起点坐标
            }, {
              coord: toCoord, // 终点坐标,
              value: dataItem.countryCount
            }])
          }
        }
        return res
      }
      const handleData = function(data) {
        return data.map(item => {
          if (that.lastData[item.country]) {
            const past = that.calcTimeData() > 0 ? that.calcTimeData() : 0
            const pastCount = past > gutter ? Math.floor((gutter * that.lastData[item.country]) / gutter) : Math.floor((past * that.lastData[item.country]) / gutter)
            return {
              name: item.countryName,
              value: geoCoordMap[item.countryName], // 起点的位置
              num: item.countryCount - that.lastData[item.country] + pastCount
            }
          }
          // (item.totalAmount / 10000).toFixed(2)
          return {
            name: item.countryName,
            value: geoCoordMap[item.countryName], // 起点的位置
            num: item.countryCount
          }
        })
      }

      let i = 0
      this.timer = setInterval(() => {
        i++
        if (i > totalNum) {
          clearInterval(this.timer)
          return
        }
        const data = {
          series: [{
            // 白色航线特效图
            type: 'lines',
            zlevel: 1, // 用于分层，z-index的效果
            effect: {
              show: true, // 动效是否显示
              period: 6, // 特效动画时间
              trailLength: 0, // 特效尾迹的长度
              delay: function() {
                return Math.ceil(Math.random() * 3) * 1000
              },
              color: color[1], // 特效颜色
              symbol: iconPath,
              symbolSize: 24 // 特效大小
            },
            tooltip: {
              show: false
            },
            lineStyle: {
              normal: { // 正常情况下的线条样式
                color: color[0],
                width: 2, // 因为是叠加效果，要是有宽度，线条会变粗，白色航线特效不明显
                curveness: -0.2 // 线条曲度
              }
            },
            data: convertData(point) // 特效的起始、终点位置
          }, {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            symbolSize: (val) => {
              return 6
            },
            // encode: {
            //   value: 2
            // },
            // showEffectOn: 'render',
            rippleEffect: {
              // 涟漪特效
              period: 8, // 动画时间，值越小速度越快
              brushType: 'stroke', // 波纹绘制方式 stroke, fill
              scale: 4 // 波纹圆环最大限制，值越大波纹越大
            },
            label: {
              // formatter: '{b} 订单数量 ' + params.data.num : '')',
              formatter: function(params, ticket, callback) {
                // if (params.seriesType === 'lines') return
                return `{b|${params.data.name}}\n{a|${params.data.num}}`
              },
              rich: {
                a: {
                  fontSize: 12,
                  fontWeight: 'bold',
                  color: color[1]
                },
                b: {
                  fontSize: 10,
                  fontWeight: 'bold',
                  color: color[0]
                }
              },
              position: 'top', // left insideRight
              distance: 8,
              offset: [16, -12],
              lineHeight: 16,
              // rotate: -15,
              padding: [5, 5],
              align: 'right',
              verticalAlign: 'middle',
              show: true
            },
            itemStyle: {
              normal: {
                color: color[0],
                shadowBlur: 10,
                shadowColor: '#000000'
              }
            },
            zlevel: 3,
            data: handleData(point)
          }, {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            symbolSize: (val) => {
              return 10
            },
            rippleEffect: {
              // 涟漪特效
              period: 8, // 动画时间，值越小速度越快
              brushType: 'stroke', // 波纹绘制方式 stroke, fill
              scale: 4 // 波纹圆环最大限制，值越大波纹越大
            },
            label: {
              formatter: '{b}',
              position: 'right',
              fontWeight: 'bold',
              fontSize: 14,
              show: true
            },
            itemStyle: {
              normal: {
                color: color[1],
                shadowBlur: 10,
                shadowColor: '#000000'
              }
            },
            zlevel: 3,
            data: [
              {
                name: '安徽',
                value: [117.283042, 31.86119, 30] // 起点的位置
              }
            ]
          }]
        }
        this.mapChart.setOption(data)
      }, Math.ceil(gutter / totalNum))
    },
    // 地图配置
    mapConfigure() {
      // 小飞机图标
      const iconPath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z'
      const color = ['#beeaf8', '#CC6131', '#e6ac53']
      this.mapChart.hideLoading()
      // 定义
      var geoCoordMap = area.cp
      const nameMap = {}
      for (const key in area.namemap) {
        nameMap[area.namemap[key]] = key
      }
      // 飞线点
      const point = this.mapData
      // 获取地图中起点和终点的坐标，以数组形式保存下来
      const that = this
      const gutter = 1000 * 60 * 60 * 9
      const handleData = function(data) {
        return data.map(item => {
          if (that.lastData[item.country]) {
            const past = that.calcTimeData() > 0 ? that.calcTimeData() : 0
            const pastCount = past > gutter ? Math.floor((gutter * that.lastData[item.country]) / gutter) : Math.floor((past * that.lastData[item.country]) / gutter)
            return {
              name: item.countryName,
              value: geoCoordMap[item.countryName], // 起点的位置
              num: item.countryCount - that.lastData[item.country] + pastCount
            }
          }
          // (item.totalAmount / 10000).toFixed(2)
          return {
            name: item.countryName,
            value: geoCoordMap[item.countryName], // 起点的位置
            num: item.countryCount
          }
        })
      }
      var convertData = function(data) {
        const res = []
        for (let i = 0; i < data.length; i++) {
          const dataItem = data[i]
          const fromCoord = [117.283042, 31.86119]
          const toCoord = geoCoordMap[dataItem.countryName]
          if (toCoord && fromCoord) {
            res.push([{
              coord: fromCoord // 起点坐标
            }, {
              coord: toCoord, // 终点坐标,
              value: dataItem.countryCount
            }])
          }
        }
        return res
      }
      this.mapChart.setOption({ // 进行相关配置
        title: {
          top: '0',
          text: '出口国家订单量分布',
          left: 'left',
          textStyle: {
            color: '#2f93cf',
            fontWeight: 'normal'
          }
        },
        tooltip: {
          show: false,
          trigger: 'item',
          backgroundColor: 'transparent',
          borderColor: 'transparent',
          showDelay: 0,
          hideDelay: 0,
          enterable: false,
          transitionDuration: 0,
          extraCssText: 'z-index:100',
          formatter: function(params, ticket, callback) {
            // if (params.seriesType === 'lines') return
            return params.data.name + (params.data.num ? ': 订单数量 ' + params.data.num : '')
          }
        },
        visualMap: {
          type: 'continuous', // continuous 类型为连续型  piecewise 类型为分段型
          show: false,
          min: 0,
          max: 10000,
          left: '10%',
          top: 'bottom',
          calculable: false,
          seriesIndex: [1],
          inRange: {
            color: ['#e6ac53', '#9fb5ea', '#e6ac53', '#74e2ca', '#85daef', '#9feaa5', '#5475f5']
          }
        },
        geo: {
          map: 'world',
          roam: false,
          zoom: 1.28, // 1.24
          top: 'bottom',
          nameMap: area.nameMap,
          label: {
            normal: {
              show: false
            },
            emphasis: {
              // show: false,
              color: '#00FEFD'
            },
            color: '#fff'
          },
          regions: [{ // 选中的区域
            name: 'China',
            selected: false,
            itemStyle: { // 高亮时候的样式
              // normal: {
              //   areaColor: '#2f93cf' // 地图颜色 0083ce
              // },
              emphasis: {
                // areaColor: '#00FEFD'
              }
            },
            label: { // 高亮的时候不显示标签
              emphasis: {
                // show: false
              }
            }
          }],
          itemStyle: {
            normal: {
              areaColor: 'rgba(10, 51, 68, 0.7)', // 地图颜色 0083ce
              borderColor: '#0083ce', // 省份边界颜色
              borderWidth: '1.5'
            },
            emphasis: {
              borderColor: '#0066ba', // 选中省份边界颜色
              areaColor: '#0494e1', // 选中省份颜色
              shadowColor: 'rgba(0, 0, 0, 0.4)', // 选中省份投影
              shadowBlur: 6
            }
          }
        },
        series: [{
          // 白色航线特效图
          type: 'lines',
          zlevel: 1, // 用于分层，z-index的效果
          effect: {
            show: true, // 动效是否显示
            period: 6, // 特效动画时间
            trailLength: 0, // 特效尾迹的长度
            delay: function() {
              return Math.ceil(Math.random() * 3) * 1000
            },
            color: color[2], // 特效颜色
            symbol: iconPath,
            symbolSize: 20 // 特效大小
          },
          tooltip: {
            show: false
          },
          lineStyle: {
            normal: { // 正常情况下的线条样式
              color: color[0],
              width: 2, // 因为是叠加效果，要是有宽度，线条会变粗，白色航线特效不明显
              curveness: -0.2 // 线条曲度
            }
          },
          data: convertData(point) // 特效的起始、终点位置
        }, {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          symbolSize: (val) => {
            return 6
          },
          // encode: {
          //   value: 2
          // },
          // showEffectOn: 'render',
          rippleEffect: {
            // 涟漪特效
            period: 8, // 动画时间，值越小速度越快
            brushType: 'stroke', // 波纹绘制方式 stroke, fill
            scale: 4 // 波纹圆环最大限制，值越大波纹越大
          },
          label: {
            // formatter: '{b} 订单数量 ' + params.data.num : '')',
            formatter: function(params, ticket, callback) {
              // if (params.seriesType === 'lines') return
              return `{b|${params.data.name}}\n{a|${params.data.num}}`
            },
            rich: {
              a: {
                fontSize: 12,
                fontWeight: 'bold',
                color: color[1]
              },
              b: {
                fontSize: 10,
                fontWeight: 'bold',
                color: color[0]
              }
            },
            position: 'top', // left insideRight
            distance: 8,
            offset: [16, -12],
            lineHeight: 16,
            // rotate: -15,
            padding: [5, 5],
            align: 'right',
            verticalAlign: 'middle',
            show: true
          },
          itemStyle: {
            normal: {
              color: color[0],
              shadowBlur: 10,
              shadowColor: '#000000'
            }
          },
          zlevel: 3,
          data: handleData(point)
        }, {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          symbolSize: (val) => {
            return 10
          },
          rippleEffect: {
            // 涟漪特效
            period: 8, // 动画时间，值越小速度越快
            brushType: 'stroke', // 波纹绘制方式 stroke, fill
            scale: 4 // 波纹圆环最大限制，值越大波纹越大
          },
          label: {
            formatter: '{b}',
            position: 'right',
            fontWeight: 'bold',
            fontSize: 14,
            show: true
          },
          itemStyle: {
            normal: {
              color: color[1],
              shadowBlur: 10,
              shadowColor: '#000000'
            }
          },
          zlevel: 3,
          data: [
            {
              name: '安徽',
              value: [117.283042, 31.86119, 30] // 起点的位置
            }
          ]
        }]
      })
      this.$nextTick(() => {
        this.countDown()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
