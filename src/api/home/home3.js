import axios from '@/libs/api.request'
import BASE_URL from './baseUrl'

// -------------------------------------------业务员首页--------------------------------------
// 获取业务员首页汇总信息
export const getCollection = (params) => {
  return axios.request({
    url: `${BASE_URL}clerk/home/collection`,
    params,
    method: 'get'
  })
}

// 获取业务员首页POS数量
export const getPos = (params) => {
  return axios.request({
    url: `${BASE_URL}clerk/home/pos`,
    params,
    method: 'get'
  })
}

// 获取业务员首页商户排行榜
export const getMerchantRank = (params) => {
  return axios.request({
    url: `${BASE_URL}clerk/home/merchantsRank`,
    params,
    method: 'get'
  })
}

// 获取业务员首页POS排行榜
export const getPosRank = (params) => {
  return axios.request({
    url: `${BASE_URL}clerk/home/posRank`,
    params,
    method: 'get'
  })
}

// 获取业务员首页折线图本月交易金额
export const getTransaction = (params) => {
  return axios.request({
    url: `${BASE_URL}clerk/home/monthTransaction`,
    params,
    method: 'get'
  })
}

// -------------------------------------------商户首页--------------------------------------
// 获取商户首页汇总信息
export const getMerchantCollection = (params) => {
  return axios.request({
    url: `${BASE_URL}merchant/home/collection`,
    params,
    method: 'get'
  })
}

// 获取商户首页POS数量
export const getMerchantPos = (params) => {
  return axios.request({
    url: `${BASE_URL}merchant/home/pos`,
    params,
    method: 'get'
  })
}

// 获取商户首页门店排行榜
export const getMerchantStoreRank = (params) => {
  return axios.request({
    url: `${BASE_URL}merchant/home/storeRank`,
    params,
    method: 'get'
  })
}

// 获取商户首页POS排行榜
export const getMerchantPosRank = (params) => {
  return axios.request({
    url: `${BASE_URL}merchant/home/posRank`,
    params,
    method: 'get'
  })
}

// 获取商户首页折线图月交易金额
export const getMonthTransaction = (params) => {
  return axios.request({
    url: `${BASE_URL}merchant/home/monthTransaction`,
    params,
    method: 'get'
  })
}

// 获取商户首页折线图月营销金额
export const getMonthActivity = (params) => {
  return axios.request({
    url: `${BASE_URL}merchant/home/monthActivity`,
    params,
    method: 'get'
  })
}
