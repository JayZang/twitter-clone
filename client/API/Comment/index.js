import axios from 'axios'

import store from '@/store'

async function SendCommentToPost (postId, request) {
  let res;
  let token = store.getters.authToken

  try {
    res = await axios({
      method: 'POST',
      url: `/API/comment/post/${postId}`,
      data: request,
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
  SendCommentToPost
}
