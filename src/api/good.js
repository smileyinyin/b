import axios from '@/libs/api.request'

const BASE_URL = 'sxwGoods/'

export const goodsList = (params) => {
  return axios.request({
    url: `${BASE_URL}goods/findGoodsList`,
    params,
    method: 'get'
  })
}
// 点击添加库存 获取内部数据
export const kcList = (params) => {
  return axios.request({
    url: `${BASE_URL}update/findInventory`,
    params,
    method: 'get'
  })
}
// 添加库存
export const addkcList = (params) => {
  return axios.request({
    url: `${BASE_URL}update/updateInventory`,
    params,
    method: 'get'
  })
}
// 添加 商品
export const addList = (data) => {
  return axios.request({
    url: `${BASE_URL}submit/addAudit`,
    data,
    method: 'post'
  })
}

// /submit/findAudit
// 查看
export const findAudit = (params) => {
  return axios.request({
    url: `${BASE_URL}submit/findAudit`,
    params,
    method: 'get'
  })
}
// 修改
export const updateAudit = (data) => {
  return axios.request({
    url: `${BASE_URL}submit/updateAudit`,
    data,
    method: 'post'
  })
}
