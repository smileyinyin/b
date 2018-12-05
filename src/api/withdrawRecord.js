import axios from '@/libs/api.request'

const BASE_URL = 'loginregister/'
// const BASE_URL = 'http://192.168.9.80:9095/'

// 获取验证码
export const validateCode = (params) => {
  return axios.request({
    url: `${BASE_URL}login/user/validateCode`,
    // url: 'http://192.168.9.41:9093/login/user/validateCode',
    params,
    method: 'get'
  })
}

// 验证验证码是否正确
export const checkValidate = (params) => {
  return axios.request({
    url: `${BASE_URL}login/user/checkValidate`,
    params,
    method: 'get'
  })
}

// 修改密码
export const updatePassword = (params) => {
  return axios.request({
    url: `${BASE_URL}login/user/updatePassword`,
    params,
    method: 'get'
  })
}

// 修改手机号
export const updateMobile = (params) => {
  return axios.request({
    url: `${BASE_URL}login/user/updateMobile`,
    params,
    method: 'get'
  })
}
