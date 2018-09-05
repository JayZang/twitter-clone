import axios from 'axios'

async function follow (userId, token) {
  let res

  try {
    res = await axios({
        methods: 'get',
        url: `/API/user/follow/${userId}`,
        headers: {
          'x-auth': token
        }
      })
  } catch (e) {
    return {
      result: false,
      errMsg: '無法連接伺服器'
    }
  }

  return res.data
}

async function deleteFollow (userId, token) {
  let res

  try {
    res = await axios({
        method: 'DELETE',
        url: `/API/user/follow/${userId}`,
        headers: {
          'x-auth': token
        }
      })
  } catch (e) {
    return {
      result: false,
      errMsg: '無法連接伺服器'
    }
  }

  return res.data
}

export default {
  follow,
  deleteFollow
}
