import Vue from 'vue'
import Router from 'vue-router'
import HomeRouter from './Home'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    ...HomeRouter
  ]
})
