import axios from '@/libs/api.request'
import BASE_URL from './baseUrl'

// --------------------------------------- 城市合伙人 ---------------------------------------- //
// 统计数据 商户/门店/业务员/pos机
export const getSum = (cityPartnerId) => {
  return axios.request({
    url: `${BASE_URL}cityRole/findSumNumber`,
    params: { cityPartnerId },
    method: 'get'
  })
}

// 统计数据 历史交易金额/今日交易金额
export const getTransaction = (cityPartnerId) => {
  return axios.request({
    url: `${BASE_URL}cityRole/findTrxMoney`,
    params: { cityPartnerId },
    method: 'get'
  })
}

// 统计数据 历史利润/上月利润
export const getProfit = (cityPartnerId) => {
  return axios.request({
    url: `${BASE_URL}cityRole/findProfitMoney`,
    params: { cityPartnerId },
    method: 'get'
  })
}

// 业务员业绩排行榜
export const getSaleManList = (cityPartnerId) => {
  return axios.request({
    url: `${BASE_URL}cityRole/findSaleManTrxMoney`,
    params: { cityPartnerId },
    method: 'get'
  })
}

// 商户业绩排行榜
export const getMerchantList = (cityPartnerId) => {
  return axios.request({
    url: `${BASE_URL}cityRole/findMerchantsTrxMoney`,
    params: { cityPartnerId },
    method: 'get'
  })
}

// 渠道合伙人业绩排行榜
export const getChannelList = (cityPartnerId) => {
  return axios.request({
    url: `${BASE_URL}cityRole/findChennelTrxMoney`,
    params: { cityPartnerId },
    method: 'get'
  })
}

// pos实时推送
export const getPosList = (cityPartnerId) => {
  return axios.request({
    url: `${BASE_URL}cityRole/findRealTimeDelivery`,
    params: { cityPartnerId },
    method: 'get'
  })
}

// 交易流水折线图
export const getWaterBill = (cityPartnerId) => {
  return axios.request({
    url: `${BASE_URL}cityRole/findBrokenLine`,
    params: { cityPartnerId },
    method: 'get'
  })
}
