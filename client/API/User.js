import axios from 'axios'

async function login (request) {
  let res;

  try {
    res = await axios.post('/API/user/login', request)
  } catch(e) {
    return {
      result: false,
      errMsg: '無法連接伺服器'
    }
  }

  return res.data
}

async function regist (request) {
  let res;

  try {
    res = await axios.post('/API/user/', request)
  } catch (e) {
    return {
      result: false,
      errMsg: '無法連接伺服器'
    }
  }

  return res.data
}

export default {
  login,
  regist
}
