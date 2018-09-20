const express = require('express')

const UserModel = require('../../model/user')

const router = express.Router()

// See https://stackoverflow.com/questions/38421664/fuzzy-searching-with-mongodb
// Escape regular expression special characters
function escapeRegex (text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
};

router.get('/person/:query', async (req, res) => {
  try {
    // fuzzy query
    const regex = new RegExp(escapeRegex(req.params.query), 'gi')
    let users = await UserModel.find({name: regex}, '_id account name profileImg bkgWallImg')
      .catch(e => {
        throw new Error('搜尋發生錯誤')
      })

    // 判斷各用戶是否為已登入使用者的追蹤對象
    if (req.user) {
      users = users.map(item => {
        let _item = item.toObject()
        _item.isFollowing = !!req.user.following.find(val => val.toString() === _item._id.toString())

        return _item
      })
    }

    res.json({
      result: true,
      users
    })
  } catch (e) {
    let errMsgArray = []
    let errMsg = ''

    if (e.errors) {
      Object.keys(e.errors).forEach(key => {
        errMsgArray.push(e.errors[key].message)
      })

      errMsg = errMsgArray.join(', ')
    }

    !!errMsg && (errMsg += ', ')
    errMsg += e.message || '未知錯誤'

    res.json({
      result: false,
      errMsg,
      err: e
    })
  }
})

module.exports = router
