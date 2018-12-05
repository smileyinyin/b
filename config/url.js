// http://formal.zuul.sxwhome.com/ 正式服务地址!!
// http://dev.zuul.sxwhome.com/ 测试服务地址
// dev_url 最好用 '', 使用 devServer 代理请求
const DEV_URL = 'http://dev.zuul.sxwhome.com/' // http://192.168.9.12:7092

// 正式！！
const PRO_URL = 'http://formal.zuul.sxwhome.com/'

// 测试
const TEST_URL = 'http://dev.zuul.sxwhome.com/'

// wuxi
const WUXI_URL = 'http://wuxi.zuul.sxwhome.com/'

const BASE_URL = process.env.NODE_ENV === 'development'
  ? DEV_URL
  : process.env.VUE_APP_MODE === 'test'
    ? TEST_URL
    : process.env.VUE_APP_MODE === 'wuxi'
      ? WUXI_URL
      : PRO_URL

export default BASE_URL
