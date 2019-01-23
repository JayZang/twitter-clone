import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'
import HomeRouter from './Home'
import SearchRouter from './Search'
import LoginRouter from './login'
import RegistRouter from './regist'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  routes: [
    ...LoginRouter,
    ...RegistRouter,
    ...SearchRouter,
    ...HomeRouter
  ]
})

// 全局路由守衛設置
router.beforeEach( async (to, from, next) => {
  // 是否已身份確認
  if (!store.getters.isAuthChecked ||
      (store.getters.isLogin && !store.getters.isInMaxDurationTime())){
    await store.dispatch('checkAuth')
    console.log('Auth Updated')
  }

  // 登入用戶不能造訪之頁面
  if(to.meta.requireNotLogin && store.getters.isLogin)
    return next('/')

  // 預設網頁 title
  if(to.meta.title)
    document.title = to.meta.title

  next()
})

export default router
