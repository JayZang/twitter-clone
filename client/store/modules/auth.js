import moment from 'moment'

import userAuth from '@/API/User/Auth'

const state = {
  isAuthChecked: false,
  user: null,
  authToken: null,
  loginTime: null,
  maxDurationTime: moment.duration(1 * 60 * 60 * 1000).asHours()
}

const getters = {
  isLogin: state => !!state.user,
  isAuthChecked: state => !!state.isAuthChecked,
  isInMaxDurationTime: state => () => {
    return moment.duration(moment().diff(state.loginTime)).asHours() < state.maxDurationTime
  },
  userID: state => state.user && state.user._id,
  userAccount: state => state.user && state.user.account,
  userFollowing: state => state.user && state.user.following,
  authToken: state => state.authToken
}

const actions = {
  regist: async ({commit}, para) => {
    if (!para.name || !para.account || !para.password || !para.password2) {
      return {
        errMsg: '請勿空白',
        result: false
      }
    }

    let {res, token} = await userAuth.regist(para)

    if (res.result) {
      commit('setUser', res.user)
      commit('setAuthToken', token)
      commit('setLoginTime', moment())
      window.localStorage.setItem('AuthToken', token)
    }
    return res
  },
  login: async ({commit}, para) => {
    if (!para.account || !para.password) {
      return {
        errMsg: '帳號和密碼請勿空白',
        result: false
      }
    }

    let {res, token} = await userAuth.login(para)

    if (res.result) {
      commit('setUser', res.user)
      commit('setAuthToken', token)
      commit('setLoginTime', moment())
      window.localStorage.setItem('AuthToken', token)
    }
    return res
  },
  logout: ({commit}) => {
    window.localStorage.removeItem('AuthToken')
    commit('setUser', null)
    commit('setAuthToken', null)
    commit('setLoginTime', null)
  },
  checkAuth: async ({commit}) => {
    commit('setIsAuthChecked', true)

    let currentToken = window.localStorage.getItem('AuthToken')
    if (!currentToken) {
      return {
        result: false,
        errMsg: 'No Auth Token'
      }
    }

    let {res, token} = await userAuth.checkAuth(currentToken)

    if(res.result){
      window.localStorage.setItem('AuthToken', token)
      commit('setUser', res.user)
      commit('setAuthToken', token)
      commit('setLoginTime', moment())
    } else {
      // window.localStorage.removeItem('AuthToken')
      commit('setUser', null)
      commit('setAuthToken', null)
      commit('setLoginTime', null)
    }

    return res
  }
}

const mutations = {
  setUser: (state, user) => {
    state.user = user
  },
  setIsAuthChecked: (state, boolean) => {
    state.isAuthChecked = boolean
  },
  setAuthToken: (state, token) => {
    state.authToken = token
  },
  setLoginTime: (state, time) => {
    state.loginTime = time
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
