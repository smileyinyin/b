import axios from '@/libs/api.request'

const BASE_URL = 'sxwGoods/'
// const BASE_URL = 'http://192.168.9.12:7092/sxwGoods/'

export const simpleUpload = () => {
  return axios.request({
    url: `${BASE_URL}auth/simpleupload`,
    method: 'get'
  })
}

export const coverUpload = () => {
  return axios.request({
    url: '/auth/coverupload',
    method: 'get'
  })
}
