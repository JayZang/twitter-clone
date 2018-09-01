import regist from '@/View/regist'
import TopNavBar from '@/components/NavBar/TopNavBar'

export default [{
  path: '/regist',
  name: 'regist',
  components: {
    TopNavBar,
    default: regist
  }
}]
