import axios from '@/libs/api.request'

const BASE = 'supply/'

// 供应商列表
export const getSupplyList = (params) => {
  return axios.request({
    url: `${BASE}`,
    params,
    method: 'get'
  })
}

// 启用，停用 供应商
export const activeSupply = (params) => {
  return axios.request({
    url: `${BASE}`,
    params,
    method: 'get'
  })
}

// 获取 供应商详情
export const getSupply = (params) => {
  return axios.request({
    url: `${BASE}`,
    params,
    method: 'get'
  })
}

// 新增 供应商
export const addSupply = (data) => {
  return axios.request({
    url: `${BASE}`,
    data,
    method: 'post'
  })
}

// 新增 供应商
export const updateSupply = (data) => {
  return axios.request({
    url: `${BASE}`,
    data,
    method: 'post'
  })
}
