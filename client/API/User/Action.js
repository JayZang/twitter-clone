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
      res: {
        result: false,
        errMsg: '無法連接伺服器'
      }
    }
  }

  return {
    res: res.data
  }
}

export default {
  follow
}
