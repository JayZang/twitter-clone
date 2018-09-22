import regist from '@/View/regist'
import TopNavBar from '@/components/Bar/TopNavBar'

export default [{
  path: '/regist',
  name: 'regist',
  components: {
    TopNavBar,
    default: regist
  },
  meta: {
    requireNotLogin: true,
    title: 'Sign up'
  }
}]
