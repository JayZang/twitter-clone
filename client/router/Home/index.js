import Home from '@/View/Home'
import PersonalHome from '@/View/Home/Personal'
import UserHome from '@/View/Home/User'

import TopNavBar from '@/components/NavBar/TopNavBar'
import PersonalPost from '@/components/Home/Personal/Post/'
import PersonalFollowing from '@/components/Home/Personal/Following'
import PersonalFollower from '@/components/Home/Personal/Follower'
import DetailPostInfoComponent from '@/components/Home/Personal/Post/DetailPostInfo'

import store from '@/store'

export default [{
  path: '/',
  name: 'Home',
  component: Home,
  meta: {
    title: 'Twitter'
  },
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
    default: UserHome
  },
  beforeEnter (to, from, next) {
    if (!store.getters.isLogin) {
      return next({name: 'Home'})
    }

    return next()
  }
}, {
  path: '/:PersonAccount',
  components: {
    TopNavBar,
    default: PersonalHome
  },
  children: [{
    path: '',
    name: 'PersonPosts',
    component: PersonalPost,
    children: [{
      path: 'post/:PostID',
      name: 'PersonDetailPostInfo',
      component: DetailPostInfoComponent
    }]
  }, {
    path: 'following',
    name: 'PersonFollowing',
    component: PersonalFollowing
  }, {
    path: 'follower',
    name: 'PersonFollower',
    component: PersonalFollower
  }]
}]
