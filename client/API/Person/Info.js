import axios from 'axios'

import store from '@/store'

async function GetPersonBasicInfo (personId) {
  let res
  let token = store.getters.authToken

  try {
    res = await axios({
        methods: 'get',
        url: `/API/person/${personId}`,
        headers: {
          'x-auth': token
        }
      })
  } catch (e) {
    return {
      res: {
        result: false,
        errMsg: '無法連接伺服器'
      }
    }
  }

  return res.data
}

async function GetPersonFollowingInfo (personId) {
  let res
  let token = store.getters.authToken

  try {
    res = await axios({
        methods: 'get',
        url: `/API/person/${personId}/following`,
        headers: {
          'x-auth': token
        }
      })
  } catch (e) {
    return {
      res: {
        result: false,
        errMsg: '無法連接伺服器'
      }
    }
  }

  return res.data
}

async function GetPersonFollowerInfo (personId) {
  let res
  let token = store.getters.authToken

  try {
    res = await axios({
        methods: 'get',
        url: `/API/person/${personId}/follower`,
        headers: {
          'x-auth': token
        }
      })
  } catch (e) {
    return {
      res: {
        result: false,
        errMsg: '無法連接伺服器'
      }
    }
  }

  return res.data
}

async function GetPersonPosts (personId) {
  let res
  let token = store.getters.authToken

  try {
    res = await axios({
      method: 'GET',
      url: `/API/person/${personId}/posts`,
      headers: {
        'x-auth': token
      }
    })
  } catch (e) {
    return {
      res: {
        result: false,
        errMsg: '無法連接伺服器'
      }
    }
  }

  return res.data
}

export default {
  GetPersonBasicInfo,
  GetPersonFollowingInfo,
  GetPersonFollowerInfo,
  GetPersonPosts
}
