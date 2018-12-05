import axios from '@/libs/api.request'
import BASE_URL from './baseUrl'

// ---------------------------------------  渠道合伙人  ---------------------------------------- //
// 统计数据 商户/门店/业务员/pos机
export const getSum = (channelPartnerId) => {
  return axios.request({
    url: `${BASE_URL}channelRole/findChannelSumNumber`,
    params: { channelPartnerId },
    method: 'get'
  })
}

// 统计数据 历史交易金额/今日交易金额
export const getTransaction = (channelPartnerId) => {
  return axios.request({
    url: `${BASE_URL}channelRole/findChannelTrxMoney`,
    params: { channelPartnerId },
    method: 'get'
  })
}

// 统计数据 历史利润/上月利润
export const getProfit = (channelPartnerId) => {
  return axios.request({
    url: `${BASE_URL}channelRole/findChannelProfitMoney`,
    params: { channelPartnerId },
    method: 'get'
  })
}

// 业务员业绩排行榜
export const getSaleManList = (channelPartnerId) => {
  return axios.request({
    url: `${BASE_URL}channelRole/findChannelSalesmanTrxMoney`,
    params: { channelPartnerId },
    method: 'get'
  })
}

// 商户业绩排行榜
export const getMerchantList = (channelPartnerId) => {
  return axios.request({
    url: `${BASE_URL}channelRole/findChannelMerchantsTrxMoney`,
    params: { channelPartnerId },
    method: 'get'
  })
}

// pos实时推送
export const getPosList = (channelPartnerId) => {
  return axios.request({
    url: `${BASE_URL}channelRole/findChannelRealTimeDelivery`,
    params: { channelPartnerId },
    method: 'get'
  })
}

// 交易流水折线图
export const getWaterBill = (channelPartnerId) => {
  return axios.request({
    url: `${BASE_URL}channelRole/findChannelBrokenLine`,
    params: { channelPartnerId },
    method: 'get'
  })
}
