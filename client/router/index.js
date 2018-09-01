import Vue from 'vue'
import Router from 'vue-router'
import HomeRouter from './Home'
import LoginRouter from './login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...LoginRouter,
    ...HomeRouter
  ]
})
