import axios from '@/libs/api.request'

const BASE_URL = 'loginregister/'

// 短信验证
export const validateCode = (params) => {
  return axios.request({
    url: `${BASE_URL}login/user/validateCode`,
    params,
    method: 'get'
  })
}
