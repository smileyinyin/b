import axios from '@/libs/api.request'

const BASE_URL = 'sxwGoods/'

export const findList = (params) => {
  return axios.request({
    url: `${BASE_URL}list/findList`,
    params,
    method: 'get'
  })
}
