import Home from '@/View/Home'
import UserHome from '@/View/Home/User'
import PersonalHome from '@/View/Home/Personal'
import TopNavBar from '@/components/NavBar/TopNavBar'
import store from '@/store'

export default [{
  path: '/',
  name: 'Home',
  component: Home,
  beforeEnter (to, from, next) {
    if (store.getters.isLogin) {
      return next({name: 'UserHome'})
    }

    next()
  }
}, {
  path: '/',
  name: 'UserHome',
  component: UserHome,
  beforeEnter (to, from, next) {
    if (!store.getters.isLogin) {
      return next('/login')
    }

    return next()
  }
}, {
  path: '/:UserId',
  name: 'PersonalHome',
  components: {
    TopNavBar,
    default: PersonalHome
  }
}]
