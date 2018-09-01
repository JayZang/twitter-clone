import Vue from 'vue'
import Router from 'vue-router'
import HomeRouter from './Home'
import LoginRouter from './login'
import Register from './regist'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...LoginRouter,
    ...Register,
    ...HomeRouter
  ]
})
