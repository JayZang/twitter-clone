import Home from '@/View/Home'
import PersonalHome from '@/View/Home/Personal'
import TopNavBar from '@/components/NavBar/TopNavBar'
import store from '@/store'

export default [{
  path: '/',
  name: 'Home',
  component: Home,
  beforeEnter (to, from, next) {
    // 已登入使用者渲染使用者首頁而非預設首頁
    if (store.getters.isLogin) {
      return next({name: 'UserHome'})
    }

    next()
  }
}, {
  path: '/',
  name: 'UserHome',
  components: {
    TopNavBar,
    default: PersonalHome
  },
  props: {
    default: {
      UserId: () => {
        return store.getters.userAccount
      }
    }
  },
  beforeEnter (to, from, next) {
    if (!store.getters.isLogin) {
      return next({name: 'Home'})
    }

    return next()
  }
}, {
  path: '/:OtherUserId',
  name: 'OtherUserHome',
  components: {
    TopNavBar,
    default: PersonalHome
  }
}]
