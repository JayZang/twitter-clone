import userAPI from '@/API/user'

const state = {
  user: null,
  token: null
}

const getters = {
  isLogin: state => !!state.user
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
    console.log(res)
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
  }
}

const mutations = {
  setUser: (state, user) => {
    state.user = user
  },
  setToken: (state, token) => {
    state.token = token
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
