import axios from 'axios'

async function login (account, password) {
  let res;

  try {
    res = await axios.post('/API/user/login', {
      account,
      password
    })
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
    res = await axios.post('/API/user/', {
      name: request.name,
      account: request.account,
      password: request.password,
      password2: request.password2
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
  login,
  regist
}
