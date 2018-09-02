import axios from 'axios'

async function login (account, password) {
  let result;
  try {
    result = await axios.post('/API/user/login', {
      account,
      password
    })
  } catch(e) {
    return {
      result: false,
      errMsg: '無法連接伺服器'
    }
  }

  return result.data
}

export default {
  login
}
