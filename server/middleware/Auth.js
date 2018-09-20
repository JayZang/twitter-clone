const UserModel = require('../model/user')

const GetLoginUser = async (req, res, next) => {
  let token = req.headers['x-auth']

  if (!token) {
    return next()
  }

  try {
    req.user = await UserModel.findByToken(token)
    req.token || (req.token = {})
    req.token.auth = token

    next()
  } catch (e) {
    // do nothing
    next()
  }
}

module.exports = {
  GetLoginUser
}
