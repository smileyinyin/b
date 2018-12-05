import axios from '@/libs/api.request'

const BASE_URL = 'financial/'
// const BASE_URL = ''
// const BASE_URL = 'http://192.168.9.53:9099'
// 账单生成
export const monthBillList = (params) => {
  return axios.request({
    url: `${BASE_URL}bill/monthBillList`,
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

// 交易流水
export const flowList = (params) => {
  return axios.request({
    url: `${BASE_URL}order/flowList`,
    params,
    method: 'get'
  })
}
export const posFlowList = (params) => {
  return axios.request({
    url: `${BASE_URL}order/posFlowList`,
    params,
    method: 'get'
  })
}
// 上传
export const uploadInvoice = (params) => {
  return axios.request({
    url: `${BASE_URL}bill/uploadInvoice`,
    params,
    method: 'get'
  })
}
// 修改(查询)
export const invoice = (params) => {
  return axios.request({
    url: `${BASE_URL}orderPD/invoice`,
    params,
    method: 'get'
  })
}
// 修改
export const updateInvoiceNo = (params) => {
  return axios.request({
    url: `${BASE_URL}order/updateInvoiceNo`,
    params,
    method: 'get'
  })
}
export const posFlowdown = (params) => {
  return axios.request({
    url: `${BASE_URL}order/posFlowdown`,
    params,
    method: 'get'
  })
}

// 月度账单
export const getmonthCensus = (params) => {
  return axios.request({
    url: `${BASE_URL}order/getmonthCensus`,
    params,
    method: 'get'
  })
}
