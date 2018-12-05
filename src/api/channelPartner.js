import axios from '@/libs/api.request'

const BASE_URL = 'loginregister/'

export const getQuDaoList = (params) => {
  return axios.request({
    url: `${BASE_URL}parent/findChannelAndSalesmanList`,
    params,
    method: 'get'
  })
}

export const updateChannel = (data) => {
  return axios.request({
    url: `${BASE_URL}parent/updateRoleInfo`,
    data,
    method: 'post'
  })
}
