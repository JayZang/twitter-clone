import Home from '@/View/Home'
import PersonalHome from '@/View/Home/Personal'
import TopNavBar from '@/components/NavBar/TopNavBar'

export default [{
  path: '/',
  name: 'Home',
  component: Home
}, {
  path: '/:UserId',
  name: 'PersonalHome',
  components: {
    TopNavBar,
    default: PersonalHome
  }
}]
