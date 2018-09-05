import axios from 'axios'

async function GetPersonBasicInfo (personId) {
  let res

  try {
    res = await axios.get(`/API/person/${personId}`)
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
  GetPersonBasicInfo
}
