import axios from 'axios'

async function GetPersonBasicInfo (personId, token) {
  let res

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

async function GetPersonFollowingInfo (personId, token) {
  let res

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

async function GetPersonFollowerInfo (personId, token) {
  let res

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

export default {
  GetPersonBasicInfo,
  GetPersonFollowingInfo,
  GetPersonFollowerInfo
}
