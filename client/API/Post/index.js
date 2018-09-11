import axios from 'axios'

import store from '@/store'

async function SendPost (request) {
  let res;

  try {
    res = await axios({
      method: 'POST',
      url: `/API/post/`,
      data: request,
      headers: {
        'x-auth': store.getters.authToken
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

async function GetPersonPosts (personId, token) {
  let res;

  try {
    res = await axios({
      method: 'GET',
      url: `/API/post/person/${personId}`,
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

async function ToggleLike (postId) {
  let res;

  try {
    res = await axios({
      method: 'GET',
      url: `/API/post/${postId}/like`,
      headers: {
        'x-auth': store.getters.authToken
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
  SendPost,
  GetPersonPosts,
  ToggleLike
}
