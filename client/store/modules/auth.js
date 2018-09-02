import userAPI from '@/API/user'

const state = {
  user: null
}

const getters = {
  isLogin: state => !!state.user
}

const actions = {
  login: async ({commit}, para) => {
    let res = {}

    if (!para.account || !para.password) {
      res.errMsg = '帳號和密碼請勿空白'
      res.result = false
      return res
    }

    res = await userAPI.login(para)
    res.result && commit('setUser', res.user)
    return res
  },
  regist: async ({commit}, para) => {
    let res = {}

    if (!para.name || !para.account || !para.password || !para.password2) {
      res.errMsg = '請勿空白'
      res.result = false
      return res
    }

    res = await userAPI.regist(para)
    res.result && commit('setUser', res.user)
    return res
  }
}

const mutations = {
  setUser: (state, user) => {
    state.user = user
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
