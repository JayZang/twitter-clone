import userAPI from '@/API/user'

const state = {
  isAuthChecked: false,
  user: null
}

const getters = {
  isLogin: state => !!state.user,
  isAuthChecked: state => !!state.isAuthChecked
}

const actions = {
  login: async ({commit}, para) => {
    if (!para.account || !para.password) {
      return {
        errMsg: '帳號和密碼請勿空白',
        result: false
      }
    }

    let {res, token} = await userAPI.login(para)

    if (res.result) {
      commit('setUser', res.user)
      window.localStorage.setItem('AuthToken', token)
    }
    return res
  },
  regist: async ({commit}, para) => {
    if (!para.name || !para.account || !para.password || !para.password2) {
      return {
        errMsg: '請勿空白',
        result: false
      }
    }

    let {res, token} = await userAPI.regist(para)

    if (res.result) {
      commit('setUser', res.user)
      window.localStorage.setItem('AuthToken', token)
    }
    return res
  },
  checkAuth: async ({commit}) => {
    let currentToken = window.localStorage.getItem('AuthToken')
    let {res, token} = await userAPI.checkAuth(currentToken)

    if(res.result){
      window.localStorage.setItem('AuthToken', token)
      commit('setUser', res.user)
    }

    commit('setIsAuthChecked', true)
    return res
  }
}

const mutations = {
  setUser: (state, user) => {
    state.user = user
  },
  setIsAuthChecked: (state, boolean) => {
    state.isAuthChecked = boolean
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
