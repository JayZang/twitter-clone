import Home from '@/View/Home'
import UserHome from '@/View/Home/UserHome'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:userId',
    name: 'UserHome',
    component: UserHome,
    children: []
  }
]
