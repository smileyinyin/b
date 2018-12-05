import axios from '@/libs/api.request'

const BASE_URL = 'sxwPos/'

// 获取商户进件列表
export const findPosApplyList = (params) => {
  return axios.request({
    url: `${BASE_URL}posBinding/findPosApplyList`,
    params,
    method: 'get'
  })
}

// 获取商户加机
export const addPosApplyNum = (params) => {
  return axios.request({
    url: `${BASE_URL}posBinding/addPosApplyNum`,
    params,
    method: 'post'
  })
}

// pos机激活
export const updateStoresPos = (params) => {
  return axios.request({
    url: `${BASE_URL}posBinding/updateStoresPos`,
    params,
    method: 'get'
  })
}

// 删除商户进件的一条信息
export const delPosApply = (params) => {
  return axios.request({
    url: `${BASE_URL}posBinding/delPosApply`,
    params,
    method: 'delete'
  })
}

// 查看一条商户进件信息
export const findPosApplyDetail = (params) => {
  return axios.request({
    url: `${BASE_URL}posBinding/findPosApplyDetail`,
    params,
    method: 'get'
  })
}

// 修改pos进件信息
export const updatePosApply = (data) => {
  return axios.request({
    url: `${BASE_URL}posBinding/updatePosApply`,
    data,
    method: 'put'
  })
}

// pos机审核
export const aduitPosApply = (params) => {
  return axios.request({
    url: `${BASE_URL}posBinding/aduitPosApply`,
    params,
    method: 'get'
  })
}

// pos机审核详情列表
export const getAuditInfo = (params) => {
  return axios.request({
    url: `${BASE_URL}posBinding/getAuditInfo`,
    params,
    method: 'get'
  })
}
// pos机终端列表
export const findCityStorePosList = (params) => {
  return axios.request({
    url: `${BASE_URL}posBinding/findCityStorePosList`,
    params,
    method: 'get'
  })
}
// 解绑
export const removeStoresPos = (params) => {
  return axios.request({
    url: `${BASE_URL}posBinding/removeStoresPos`,
    params,
    method: 'get'
  })
}
// pos换机
export const changeStoresPos = (params) => {
  return axios.request({
    url: `${BASE_URL}posBinding/changeStoresPos`,
    params,
    method: 'get'
  })
}
