import axios from '@/libs/api.request'

const BASE_URL = 'sxwOrder/'

export const orderList = (params) => {
  return axios.request({
    url: `${BASE_URL}order/findOrdersnew1`,
    params,
    method: 'get'
  })
}

export const findOrderDetailsnew = (params) => {
  return axios.request({
    url: `${BASE_URL}order/findOrderDetailsnew`,
    params,
    method: 'get'
  })
}

export const orderhexiao = (params) => {
  return axios.request({
    url: `${BASE_URL}order/orderhexiao`,
    params,
    method: 'get'
  })
}

export const ordersntuikuan = (params) => {
  return axios.request({
    url: `${BASE_URL}order/ordersntuikuan`,
    params,
    method: 'get'
  })
}

export const insetlogistics = (params) => {
  return axios.request({
    url: `${BASE_URL}order/insetlogistics`,
    params,
    method: 'get'
  })
}
