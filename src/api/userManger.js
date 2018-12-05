import axios from '@/libs/api.request'

const BASE_URL = 'sxwUser/'
// const BASE_URL = ''

// 用户列表
export const findMemberList = (params) => {
  return axios.request({
    url: `${BASE_URL}member/memberList`,
    params,
    method: 'get'
  })
}

// 用户详情
export const findMemberDetail = (params) => {
  return axios.request({
    url: `${BASE_URL}member/findMemberDetail`,
    params,
    method: 'get'
  })
}

// 冻结恢复操作
export const updateUserStatus = (params) => {
  return axios.request({
    url: `${BASE_URL}member/updateUserStatus`,
    params,
    method: 'get'
  })
}

// 积分明细
export const findUserIntegralLog = (params) => {
  return axios.request({
    url: `${BASE_URL}member/findUserIntegralLog`,
    params,
    method: 'get'
  })
}

// 解绑银行卡
export const deteleUntieBankCard = (params) => {
  return axios.request({
    url: `${BASE_URL}detele/deteleUntieBankCard`,
    params,
    method: 'get'
  })
}
