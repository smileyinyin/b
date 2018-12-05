import axios from '@/libs/api.request'

const BASE_URL = 'financial/'
// const BASE_URL = 'http://192.168.9.53:9101/'
export const flowList = (params) => {
  return axios.request({
    url: `${BASE_URL}order/flowList`,
    params,
    method: 'get'
  })
}
// export const posFlowList = (params) => {
//   return axios.request({
//     url: `${BASE_URL}order/posFlowList`,
//     params,
//     method: 'get'
//   })
// }

// 提现记录
export const findWithDrawList = (params) => {
  return axios.request({
    url: `${BASE_URL}order/findWithDrawList`,
    params,
    method: 'get'
  })
}
// 可提现信息
export const findWithdraw = (params) => {
  return axios.request({
    url: `${BASE_URL}order/findWithdraw`,
    params,
    method: 'get'
  })
}
// 提现操作
export const withDraw = (params) => {
  return axios.request({
    url: `${BASE_URL}order/withDraw`,
    params,
    method: 'get'
  })
}
// 分润明细
export const findProfitByRole = (params) => {
  return axios.request({
    url: `${BASE_URL}order/findProfitByRole`,
    params,
    method: 'get'
  })
}
// pos机分润
export const findPosProfitByRole = (params) => {
  return axios.request({
    url: `${BASE_URL}order/findPosProfitByRole`,
    params,
    method: 'get'
  })
}
// 账单生成
export const findBillApply = (params) => {
  return axios.request({
    url: `${BASE_URL}order/findBillApply`,
    params,
    method: 'get'
  })
}
// 更改发票号
export const saveInvoiceNo = (params) => {
  return axios.request({
    url: `${BASE_URL}order/saveInvoiceNo`,
    params,
    method: 'get'
  })
}

export const findReason = (params) => {
  return axios.request({
    url: `${BASE_URL}order/findReason`,
    params,
    method: 'get'
  })
}
// 报表
// export const exportPosFlowExcel = (params) => {
//   return axios.request({
//     url: `${BASE_URL}order/posFlowdown`,
//     params,
//     method: 'get'
//   })
// }
