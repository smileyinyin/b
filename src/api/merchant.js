import axios from '@/libs/api.request'

const BASE = 'sxwshop/'
const BASE_URL = 'sxwshop/'
// const BASE = 'http://47.97.175.225:7092/sxwshop/'
// const BASE = 'http://192.168.9.80:9022/'

// // 商户列表
// export const getMerchantsList = (params) => {
//   return axios.request({
//     url: `${BASE}shop/getMerchantsList`,
//     params,
//     method: 'get'
//   })
// }

// 添加商户
export const addMerchants = (data) => {
  return axios.request({
    url: `${BASE}shop/addMerchants`,
    data,
    method: 'post'
  })
}

// // 获取门店列表
// export const getStoreList = (params) => {
//   return axios.request({
//     url: `${BASE}shop/getStoresList`,
//     params,
//     method: 'get'
//   })
// }

// // 添加门店
// export const addStores = (data) => {
//   return axios.request({
//     url: `${BASE}shop/addStores`,
//     data,
//     method: 'post'
//   })
// }

// // 获取商户基本信息
// export const getMerchantsInfo = (shopId) => {
//   return axios.request({
//     url: `${BASE}shop/getMerchantsInfo`,
//     params: { shopId: shopId },
//     method: 'get'
//   })
// }

// // 获取 工商、法人 信息
// export const getIndustryAndLegal = (busId) => {
//   return axios.request({
//     url: `${BASE}shop/getIndustryAndLegal`,
//     params: { busId },
//     method: 'get'
//   })
// }

// // 提交 工商、法人 信息
// export const addIndustryAndLegal = (data) => {
//   return axios.request({
//     url: `${BASE}shop/addIndustryAndLegal`,
//     data,
//     method: 'post'
//   })
// }

// // 停用、恢复 商户
// export const getMerchantsActive = (params) => {
//   return axios.request({
//     url: `${BASE}shop/getMerchantsActive`,
//     params,
//     method: 'get'
//   })
// }

// // 审核商户
// export const auditMerchants = (data) => {
//   return axios.request({
//     url: `${BASE}shop/auditMerchants`,
//     data,
//     method: 'post'
//   })
// }

// // 门店详情
// export const getStoresInfo = (params) => {
//   return axios.request({
//     url: `${BASE}shop/getStoresInfo`,
//     params,
//     method: 'get'
//   })
// }

// // 修改门店
// export const updateStore = (data) => {
//   return axios.request({
//     url: `${BASE}shop/updateStores`,
//     data,
//     method: 'put'
//   })
// }

// // 修改商户
// export const updateMerchants = (data) => {
//   return axios.request({
//     url: `${BASE}shop/updateMerchants`,
//     data,
//     method: 'put'
//   })
// }

// // 修改 工商、法人 信息
// export const updateIndustryAndLegal = (data) => {
//   return axios.request({
//     url: `${BASE}shop/updateIndustryAndLegal`,
//     data,
//     method: 'put'
//   })
// }

// // 启用、停用 门店
// export const getStoresActive = (params) => {
//   return axios.request({
//     url: `${BASE}shop/getStoresActive`,
//     params,
//     method: 'get'
//   })
// }

// ----------------------------------------------new--------------------------------------------------------------------

// 商户添加、工商、法人、结算信息 (userId, roleId)
export const addMerchantsInfo = (data) => {
  return axios.request({
    url: `${BASE_URL}shop/addMerchantsInfo`,
    data,
    method: 'post'
  })
}
// 查询 商户、工商、法人、结算信息
export const getMerchants = (id) => {
  return axios.request({
    url: `${BASE_URL}shop/getMerchants`,
    params: { id },
    method: 'get'
  })
}

// 商户列表 (userId, roleId)
export const getMerchantsList = (params) => {
  return axios.request({
    url: `${BASE_URL}shop/getMerchantsList`,
    params,
    method: 'get'
  })
}

// 经营类型列表
// export const businessTypeList = () => {
//   return axios.request({
//     url: 'data/businessTypeList',
//     method: 'get'
//   })
// }

// 添加商户
// export const addMerchants = (data) => {
//   return axios.request({
//     url: `${BASE_URL}shopPD/addMerchants`,
//     data,
//     method: 'post'
//   })
// }

// 获取门店列表
export const getStoreList = (params) => {
  return axios.request({
    url: `${BASE_URL}shop/getStoresList`,
    params,
    method: 'get'
  })
}

// 添加门店
export const addStores = (data) => {
  return axios.request({
    url: `${BASE_URL}shop/addStores`,
    data,
    method: 'post'
  })
}

// 获取商户基本信息
export const getMerchantsInfo = (id) => {
  return axios.request({
    url: `${BASE_URL}shop/getMerchantsInfo`,
    params: { id },
    method: 'get'
  })
}

// 获取 工商、法人 信息
export const getIndustryAndLegal = (busId) => {
  return axios.request({
    url: `${BASE_URL}shop/getIndustryAndLegal`,
    params: { busId },
    method: 'get'
  })
}

// 提交 工商、法人 信息
export const addIndustryAndLegal = (data) => {
  return axios.request({
    url: `${BASE_URL}shop/addIndustryAndLegal`,
    data,
    method: 'post'
  })
}

// 停用、恢复 商户
export const getMerchantsActive = (params) => {
  return axios.request({
    url: `${BASE_URL}shop/getMerchantsActive`,
    params,
    method: 'get'
  })
}

// 审核商户
export const auditMerchants = (data) => {
  return axios.request({
    url: `${BASE_URL}shop/auditMerchants`,
    data,
    method: 'post'
  })
}

// 门店详情
export const getStoresInfo = (params) => {
  return axios.request({
    url: `${BASE_URL}shop/getStoresInfo`,
    params,
    method: 'get'
  })
}

// 修改门店
export const updateStore = (data) => {
  return axios.request({
    url: `${BASE_URL}shop/updateStores`,
    data,
    method: 'put'
  })
}

// 修改商户
export const updateMerchants = (data) => {
  return axios.request({
    url: `${BASE_URL}shop/updateMerchantsInfo`,
    data,
    method: 'post'
  })
}

// 启用、停用 门店
export const getStoresActive = (params) => {
  return axios.request({
    url: `${BASE_URL}shop/getStoresActive`,
    params,
    method: 'get'
  })
}

// 会员列表
export const getMemberList = (params) => {
  return axios.request({
    url: `${BASE_URL}shop/getMemberList`,
    params,
    method: 'get'
  })
}

// 门店
export const addStoresAndAccount = (data) => {
  return axios.request({
    url: `${BASE_URL}shop/addStoresAndAccount`,
    data,
    method: 'post'
  })
}

// 判断是否已有门店进件中
export const jugdeStore = (params) => {
  return axios.request({
    url: `${BASE_URL}shop/findMercIdByStoreId`,
    params,
    method: 'get'
  })
}
