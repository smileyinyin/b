import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
/* eslint-disable */
import store from '@/store'
import iView from 'iview'
import { getToken, removeToken, canTurnTo } from '@/libs/util'

Vue.use(Router)
const router = new Router({
  routes,
  mode: 'history'
})
const LOGIN_PAGE_NAME = 'login'

router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()

  // 判断 cookie 中的 token 是否存在且没过期
  let token = getToken()

  // 刷新页面时，vuex 丢失，从 localStorage 加载
  if (token && !store.state.user.userInfo) {
    let data = JSON.parse(localStorage.getItem('cp_userInfo'))
    let access = JSON.parse(localStorage.getItem('cp_access'))
    if (data) {
      store.commit('setMobile', data.mobile)
      store.dispatch('handleUserInfo', data)
      access && store.dispatch('handleAccess', access)
    } else {
      token = false // 如果 localStorage 被清掉了，需要重新登录
    }
  }

  if (!token && to.name !== LOGIN_PAGE_NAME) {
    // 未登录且要跳转的页面不是登录页
    next({ name: LOGIN_PAGE_NAME }) // 跳转到登录页
  } else if (!token && to.name === LOGIN_PAGE_NAME) {
    // 未登陆且要跳转的页面是登录页
    next() // 跳转


    // TODO 打开则暂时屏蔽首页
  } else if (token && to.name === 'home') {
    let getComponent = (name) => {
      if (name === 'SXR003') {
        return 'merchantList' // 业务员
      } else if (name === 'SXR004' || name === 'SXR006') {
        // return 'home2' // 供应商、商户
        return 'storeList' // 供应商、商户
      } else if (name === 'SXR001' || name === 'SXR002') {
        return 'merchantList' // 城市合伙人、渠道合伙人
      }
      return 'merchantList'
    }
    let component = getComponent(store.state.user.access ? store.state.user.access[0] : '')
    debugger
    next({ name: component })
    if (from.name === component) {
      iView.LoadingBar.finish()
    }

  } else if (token && to.name === LOGIN_PAGE_NAME) {
    // 已登录且要跳转的页面是登录页
    // TODO 暂时屏蔽首页
    // next({ name: 'home' }) // 跳转到home页
    next() // 跳转到登录
  } else {
    next() // 暂时不管授权。。
      // 拉取用户信息，通过用户权限和跳转的页面的name来判断是否有权限访问;access必须是一个数组，如：['super_admin'] ['super_admin', 'admin']
      // let access = store.state.user.access
      // if (canTurnTo(to.name, access, routes)) {
      //   next() // 有权限，可访问
      // } else {
      //   next({ replace: true, name: 'error_401' }) // 无权限，重定向到401页面
      // }
  }
})

router.afterEach(to => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
