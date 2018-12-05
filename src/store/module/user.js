import { login, getStoresByRole } from '@/api/user'
import { setToken, getToken } from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    roleId: '',
    mobile: '',
    avatorImgPath: '',
    token: getToken(),
    access: '',
    accessList: [],
    userInfo: '',

    storesId: []
  },
  getters: {
    getCurRole(state, getters) {
      return state.access ? state.access[0] : ''
    }
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setRoleId (state, roleId) {
      state.roleId = roleId
    },
    setUserName (state, name) {
      state.userName = name
    },
    setMobile (state, mobile) {
      state.mobile = mobile
    },
    setAccess (state, access) {
      state.access = access
    },
    setAccessList (state, accessList) {
      state.accessList = accessList
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setUserInfo (state, userInfo) {
      state.userInfo = userInfo
    },
    setStoresId (state, storesId) {
      state.storesId = storesId
    }
  },
  actions: {
    // 切换角色时 改变当前角色 和 角色ID
    handleAccess({ commit, state, dispatch }, code) {
      let roleId = state.accessList.filter(v => v.code === code)[0].id
      commit('setAccess', [code])
      commit('setRoleId', roleId)
      localStorage.setItem('cp_access', JSON.stringify(code))

      // 获取 商户 ID 数组，银行端用
      dispatch('getStoresByRole')
    },
    // 插入用户信息
    handleUserInfo ({ commit }, data) {
      let accessList = data.businessRole.map(v => ({ id: v.id, name: v.name, code: v.code }))
      commit('setUserInfo', data)
      commit('setToken', data.id)
      commit('setAvator', data.avatar)
      commit('setMobile', data.mobile)
      commit('setUserName', data.username)
      commit('setUserId', data.id)
      commit('setAccessList', accessList)
      commit('setAccess', [accessList[0].code])
      commit('setRoleId', accessList[0].id)
    },
    // 登录
    handleLogin ({ dispatch }, { userName, password }) {
      let phoneNum = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          phoneNum,
          password
        }).then(res => {
          const data = res.data
          dispatch('handleUserInfo', data)
          dispatch('handleAccess', data.businessRole.map(v => v.code)[0])

          localStorage.setItem('cp_userInfo', JSON.stringify(data))

          resolve(data)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ commit }) {
      // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
      commit('setToken', '')
      commit('setAccess', [])
      localStorage.removeItem('cp_userInfo')
      // return new Promise((resolve, reject) => {
      //   logout(state.token).then(() => {
      //     commit('setToken', '')
      //     commit('setAccess', [])
      //     resolve()
      //   }).catch(err => {
      //     reject(err)
      //   })
      // })
    },
    // 获取用户相关信息
    getStoresByRole ({ state, commit }) {
      return new Promise((resolve, reject) => {
        getStoresByRole({ userId: state.userId, roleId: state.roleId }).then(res => {
          const data = res.data
          commit('setStoresId', data)
          resolve(data)
        }).catch(err => {
          console.error('获取商户数组失败！！')
          reject(err)
        })
      })
    }
  }
}
