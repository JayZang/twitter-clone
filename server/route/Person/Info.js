var express = require('express')
var UserModel = require('../../model/user')

var router = express.Router()

router.get('/:Id', async (req, res) => {
  let personId = req.params.Id
  let person = await UserModel.findOne({
    account: personId
  })

  if (!person) {
    return res.json({
      result: false,
      errMsg: '無此用戶'
    })
  }

  res.json({
    result: true,
    person
  })
})

module.exports = router
