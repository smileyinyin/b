import axios from '@/libs/api.request'

const BASE_URL = 'loginregister/'

// 发送验证码
export const sendCode = (params) => {
  return axios.request({
    url: `${BASE_URL}login/user/sendCode`,
    params,
    method: 'get'
  })
}

// 修改密码
export const updatePasswordByCode = (params) => {
  return axios.request({
    url: `${BASE_URL}login/user/updatePasswordByCode`,
    params,
    method: 'get'
  })
}
