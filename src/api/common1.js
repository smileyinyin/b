import axios from '@/libs/api.request'

const BASE_URL = 'sxwPos/'
// const BASE_URL = 'http://192.168.9.53:9098/'

export const addPosApply = (data) => {
  return axios.request({
    url: `${BASE_URL}posBinding/addPosApply`,
    data,
    method: 'post'
  })
}

export const aduitPosApply = (params) => {
  return axios.request({
    url: `${BASE_URL}posBinding/aduitPosApply`,
    params,
    method: 'get'
  })
}
