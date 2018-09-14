import Login from '@/View/login'
import TopNavBar from '@/components/NavBar/TopNavBar'

export default [{
  path: '/login',
  name: 'Login | Twitter',
  components: {
    TopNavBar,
    default: Login
  },
  meta: {
    requireNotLogin: true,
    title: 'Login'
  }
}]
