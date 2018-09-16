import axios from 'axios'

import store from '@/store'

async function searchUsers(queryTxt) {
  let token = store.getters.authToken
  let res

  try {
    res = await axios({
      method: 'GET',
      url: `/API/search/person/${queryTxt}`,
      headers: {
        'x-auth': token
      }
    })

    return res.data
  } catch (e) {
    return {
      result: false,
      errMsg: '無法連接伺服器'
    }
  }
}

export default {
  searchUsers
}
