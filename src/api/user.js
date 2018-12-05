import axios from '@/libs/api.request'

const BASE = 'loginregister/'

export const login = ({ phoneNum, password }) => {
  const data = {
    phoneNum,
    password
  }
  return axios.request({
    url: `${BASE}login/user/login`,
    params: data,
    method: 'get'
  })
}

export const getDistrictPartner = (params) => {
  return axios.request({
    url: `${BASE}loginBusiness/getDistrictPartner`,
    params,
    method: 'get'
  })
}

export const getSaleList = (params) => {
  return axios.request({
    url: `${BASE}loginBusiness/getSaleList`,
    params,
    method: 'get'
  })
}

export const merchantSignUp = (params) => {
  return axios.request({
    url: `${BASE}loginBusiness/loginBsiness`,
    params,
    method: 'get'
  })
}

// 给城市合伙人建的商户绑定业务员
export const loginBsinessByCity = (params) => {
  return axios.request({
    url: `${BASE}loginBusiness/loginBsinessByCity`,
    params,
    method: 'get'
  })
}

export const merchantSignUpDetail = (params) => {
  return axios.request({
    url: `${BASE}loginBusiness/loginBsinessFind`,
    params,
    method: 'get'
  })
}

export const getStoresByRole = (params) => {
  return axios.request({
    url: `${BASE}login/user/findMerchantsByRoles`,
    params,
    method: 'get'
  })
}

// 查询 城市合伙人/渠道合伙人/业务员
export const findNameByRole = (params) => {
  return axios.request({
    url: `${BASE}loginBusiness/findNameByRole`,
    params,
    method: 'get'
  })
}
