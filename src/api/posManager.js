import axios from '@/libs/api.request'

const BASE_URL = 'sxwPos/'
// const BASE_URL = 'http://47.97.175.225:7092/sxwPos/'

// 获取pos机下拨列表
export const findPosSendList = (params) => {
  return axios.request({
    url: `${BASE_URL}posInput/findPosSendList`,
    params,
    method: 'get'
  })
}
// 获取pos机入库
export const savePosInfo = (params) => {
  return axios.request({
    url: `${BASE_URL}posInput/savePosInfo`,
    params,
    method: 'get'
  })
}

// 获取入库列表
export const findPosInputInfo = (params) => {
  return axios.request({
    url: `${BASE_URL}posInput/findPosInputInfo`,
    params,
    method: 'get'
  })
}

// 获取合伙人列表
export const findPartnerList = (params) => {
  return axios.request({
    url: `${BASE_URL}posInput/findPartnerList`,
    params,
    method: 'get'
  })
}

// 下拨操作
export const posSendDown = (data) => {
  return axios.request({
    url: `${BASE_URL}posInput/posSendDown`,
    data,
    method: 'post'
  })
}

// 下拨列表
// export const findPosSendList = (params) => {
//   return axios.request({
//     url: `${BASE_URL}posInput/findPosSendList`,
//     params,
//     method: 'get'
//   })
// }

// 回拨列表
export const posEchoplex = (data) => {
  return axios.request({
    url: `${BASE_URL}posInput/posEchoplex`,
    data,
    method: 'put'
  })
}

// pos机管理列表
export const findPosList = (params) => {
  return axios.request({
    url: `${BASE_URL}pos/findPosList`,
    params,
    method: 'get'
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

// pos机激活停用
export const posQiJinYong = (params) => {
  return axios.request({
    url: `${BASE_URL}pos/posQiJinYong`,
    params,
    method: 'get'
  })
}
