import Axios from 'axios'

// const BASE_URL = 'http://47.97.100.243:9006/'
// const BASE_URL = 'http://192.168.9.111:9006/'
const BASE_URL = 'http://192.168.9.42:9006/'

// 这里直接使用 axios 不经过全局拦截器
// export const getMccInfo = () => {
//   return Axios.get(`${BASE_URL}MCCSearch`).then(res => res.data.REC)
// }
export const getMccInfo = () => {
  return Axios.get(`${BASE_URL}MCCSearch`).then(res => res.data.REC)
}

// 省级
export const getProvinceInfo = () => {
  return Axios.get(`${BASE_URL}getSxoProvince`).then(res => res.data.data)
}

// 根据 省 的id 得到市级
export const getCityInfo = (pid) => {
  return Axios.get(`${BASE_URL}getSxoCity?parent_id=${pid}`).then(res => res.data.data)
}

// 根据市 的id 得到 区级
export const getAreaInfo = (pid) => {
  return Axios.get(`${BASE_URL}getSxoArea?parent_id=${pid}`).then(res => res.data.data)
}

// 行业分类 公共接口
export const getSxoIndustryInfo = () => {
  return Axios.get(`${BASE_URL}getSxoIndustryInfo`).then(res => res.data.data)
}
// 认证
export const getSxoGoodsAuth = () => {
  return Axios.get(`${BASE_URL}getSxoGoodsAuth`).then(res => res.data)
}

// 总行
export const getSxoBanksInfo = () => {
  return Axios.get(`${BASE_URL}getSxoBanksInfo`).then(res => res.data)
}

// 支行
export const getSxoBanksBranchInfoByBankId = (pid) => {
  return Axios.get(`${BASE_URL}getSxoBanksBranchInfoByBankId?bankId=${pid}`).then(res => res.data)
}

// 根据银行ID,省市ID，模糊查询银行名获取银行分支表数据
export const getSxoBanksBranchInfoByFuzzyQuery = (pid) => {
  return Axios.get(`${BASE_URL}getSxoBanksBranchInfoByFuzzyQuery?bankId=${pid.bankId}&provinceId=${pid.provinceId}&cityId=${pid.cityId}&name=${pid.name}&page=${pid.page}&size=${pid.size}`).then(res => res.data)
}

// 获取联行号
export const getBankCode = (params) => {
  return Axios.get(`${BASE_URL}getSxoBanksBranchDetail`, {
    params
  }).then(res => res.data)
  // return Axios.get(`http://47.97.175.225:9006/getBankCode?lbnk_nm=${pid}`).then(res => res.data)
}
