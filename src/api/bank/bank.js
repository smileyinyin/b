import axios from '@/libs/api.request'

const BASE_URL = 'sxwactivity/'

// 对账单
export const getAccountStatementList = (params) => {
  return axios.request({
    url: `${BASE_URL}merchant/findCheckByCondition`,
    params,
    method: 'get'
  })
}

// 活动列表
export const getActivityList = (params) => {
  return axios.request({
    url: `${BASE_URL}merchant/findActByCondition`,
    params,
    method: 'get'
  })
}

// 交易列表
export const getTransactionList = (params) => {
  return axios.request({
    url: `${BASE_URL}merchant/findTransactionByCondition`,
    params,
    method: 'get'
  })
}
