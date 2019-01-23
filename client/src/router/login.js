import Login from '@/View/login'
import TopNavBar from '@/components/Bar/TopNavBar'

export default [{
  path: '/login',
  name: 'login',
  components: {
    TopNavBar,
    default: Login
  },
  meta: {
    requireNotLogin: true,
    title: 'Login'
  }
}]
