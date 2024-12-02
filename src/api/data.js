import request from '@/utils/request'

// 数据大屏
// 企业分类数量查询
export function getCompanyTypeData() {
  return request({
    url: '/portal/company/center/comTypeCount',
    method: 'get',
    params: {
      // emptyCode: 2
    }
  })
}
// 企业数量查询
export function getCompanyNumData() {
  return request({
    url: '/portal/company/center/comCount',
    method: 'get',
    params: {
      // emptyCode: 1
    }
  })
}
// 平台推单数据统计（总数和月度统计）
export function getOrderTotalData(startTime, endTime) {
  return request({
    url: '/order/importinfo/center/totalInfos1',
    method: 'POST',
    data: {
      // emptyCode: 2
      'currency': '502',
      startTime,
      endTime
    }
  })
}
// 平台推单数据企业排名
export function getOrderRankData({ startTime, endTime }) {
  return request({
    url: '/order/importinfo/center/topCompanyTotal',
    method: 'post',
    data: {
      'currency': '502',
      'startTime': startTime,
      'endTime': endTime,
      'orderByCol': 'createTime' // totalFreight
    }
  })
}
// 平台推单数据统计同比增长
export function getOrderRatioData({ startTime, endTime }) {
  return request({
    url: '/order/importinfo/center/totalYoy1',
    method: 'post',
    data: {
      'currency': '502', // 美元502
      'startTime': startTime,
      'endTime': endTime
    }
  })
}
// 获取出口国家数据列表
export function getCountryData() {
  return request({
    url: '/order/order/center/outContryInfo',
    method: 'get',
    params: {
      'createTimes': '20220201'
    }
  })
}
// 平台推单类型占比查询
export function getTradeData() {
  return request({
    url: '/order/importinfo/center/exportTypes',
    method: 'post',
    data: {
      'orderByCol': 'totalAmount' // totalFreight
    }
  })
}
// 平台推单类型占比查询
export function getTradeData1() {
  return request({
    url: '/order/importinfo/center/exportTypes1',
    method: 'post',
    data: {
      'orderByCol': 'totalAmount' // totalFreight
    }
  })
}
