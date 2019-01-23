import TopNavBar from '@/components/Bar/TopNavBar'
import SearchView from '@/View/Search'

export default [{
  path: '/search/:query',
  name: 'Search',
  props: {
    TopNavBar: false,
    default: true
  },
  components: {
    TopNavBar,
    default: SearchView
  },
  meta: {
    title: `Search`
  }
}]
