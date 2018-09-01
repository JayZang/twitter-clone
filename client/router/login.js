import Login from '@/View/login'
import TopNavBar from '@/components/NavBar/TopNavBar'

export default [{
  path: '/login',
  name: 'Login',
  components: {
    TopNavBar,
    default: Login
  }
}]
