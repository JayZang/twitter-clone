import Home from '@/View/Home'
import PersonalHome from '@/View/Home/Personal'
import UserHome from '@/View/Home/User'

import TopNavBar from '@/components/Bar/TopNavBar'
import PersonalPost from '@/components/Home/Personal/'
import PersonalFollowing from '@/components/Home/Personal/Following'
import PersonalFollower from '@/components/Home/Personal/Follower'
import DetailPostInfoComponent from '@/components/Post/DetailPostInfo'

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

    document.title = 'Twitter Clone'
    next()
  }
}, {
  path: '/:PersonAccount',
  redirect: {
    name: 'PersonPosts'
  },
  components: {
    TopNavBar,
    default: PersonalHome
  },
  children: [{
    path: '.',
    name: 'PersonPosts',
    component: PersonalPost,
    children: [{
      path: 'post/:PostID',
      name: 'PersonDetailPostInfo',
      components: {
        DetailPostInfoComponent
      }
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
}, {
  path: '/',
  name: 'UserHome',
  components: {
    TopNavBar,
    default: UserHome
  },
  children: [{
    path: ':PersonAccount/post/:PostID',
    name: 'UserDetailPostInfo',
    props: {
      backRoute: '/'
    },
    component: DetailPostInfoComponent
  }],
  beforeEnter (to, from, next) {
    if (!store.getters.isLogin) {
      return next({name: 'Home'})
    }

    return next()
  }
}]
