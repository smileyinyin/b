import Axios from 'axios'
import baseURL from '_conf/url'
import { Notice, Spin } from 'iview'
// import Cookies from 'js-cookie'
// import { TOKEN_KEY } from '@/libs/util'
class httpRequest {
  constructor () {
    this.options = {
      method: '',
      url: ''
    }
    // 存储请求队列
    this.queue = {}
  }
  // 销毁请求实例
  destroy (url) {
    delete this.queue[url]
    const queue = Object.keys(this.queue)
    if (!queue.length) {
      setTimeout(() => {
        Spin.hide()
      }, 200)
    }
  }
  // 请求拦截
  interceptors (instance, url) {
    // 添加请求拦截器
    instance.interceptors.request.use(config => {
      // 暂时屏蔽鉴权。。。
      // if (!config.url.includes('/users')) {
      //   config.headers['x-access-token'] = Cookies.get(TOKEN_KEY)
      // }
      Spin.show()
      // 在发送请求之前做些什么
      return config
    }, error => {
      // 对请求错误做些什么
      return Promise.reject(error)
    })

    // 添加响应拦截器
    instance.interceptors.response.use((res) => {
      let { data } = res
      this.destroy(url)

      if (!(data instanceof Blob)) {
        if (data.status !== '1001') {
          data.tips && Notice.error({ title: data.tips, duration: 2 }) // Message.error(data.tips)
          // 后端服务在个别情况下回报201，待确认
          // if (data.code === 401) {
          //   Cookies.remove(TOKEN_KEY)
          //   window.location.href = '/#/login'
          //   Message.error('未登录，或登录失效，请登录')
          // } else {
          //   if (data.msg) Message.error(data.msg)
          // }
          return Promise.reject(error)
        } else if (data.tips) {
          Notice.success({ title: data.tips, duration: 2 })
        }
      }
      return data
    }, (error) => {
      Notice.error({ title: '服务器内部错误', duration: 2 })
      // 对响应错误做点什么
      this.destroy(url)
      return Promise.reject(error)
    })
  }
  // 创建实例
  create () {
    let conf = {
      baseURL: baseURL,
      // timeout: 5000,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
        // 'X-URL-PATH': location.pathname
      }
    }
    return Axios.create(conf)
  }
  // 合并请求实例
  mergeReqest (instances = []) {
    //
  }
  // 请求实例
  request (options) {
    var instance = this.create()
    this.interceptors(instance, options.url)
    options = Object.assign({}, options)
    this.queue[options.url] = instance
    return instance(options)
  }
}
export default httpRequest
