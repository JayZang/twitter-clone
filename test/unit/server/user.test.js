const expect = require('expect')
const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const { app } = require('../../../server/server')
const userModel = require('../../../server/model/user')
const postModel = require('../../../server/model/post')

describe('Server: User API', () => {
  describe('POST /API/user/ --- Register', () => {
    // clear user before every test
    beforeEach((done) => {
      userModel.deleteMany()
        .then(() => {
          done()
        })
    })

    after((done) => {
      userModel.deleteMany()
        .then(() => {
          done()
        })
    })

    it('1. should create a user', (done) => {
      let requestParams = {
        name: 'Jay',
        account: 'testCaseAccount',
        password: 11111111,
        password2: 11111111
      }

      request(app)
        .post('/API/user/')
        .send(requestParams)
        .expect(200)
        .expect((res) => {
          let body = res.body

          expect(body.result).toBe(true)
          expect(body.user.name).toBe(requestParams.name)
          expect(body.user.account).toBe(requestParams.account)
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let query = {
            name: requestParams.name,
            account: requestParams.account
          }

          userModel.findOne(query)
            .then((user) => {
              if (!user) {
                return done('User not found')
              }

              return done()
            })
            .catch(done)
        })
    })

    it('2. should not create a user when password2 not equal password', (done) => {
      let requestParams = {
        name: 'Jay',
        account: 'testCaseAccount',
        password: 11111111,
        password2: 22222222
      }

      request(app)
        .post('/API/user/')
        .send(requestParams)
        .expect(200)
        .expect((res) => {
          let body = res.body

          expect(body.result).toBe(false)
          expect(body.user).toBeFalsy()
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let query = {
            name: requestParams.name,
            account: requestParams.account,
          }

          userModel.findOne(query)
            .then((user) => {
              if (user) {
                return done('Should not create user')
              }

              return done()
            })
            .catch(done)
        })
    })

    it('3. should not create a user when length of password is shorter than 8', (done) => {
      let requestParams = {
        name: 'Jay',
        account: 'testCaseAccount',
        password: 111111,
        password2: 111111
      }

      request(app)
        .post('/API/user/')
        .send(requestParams)
        .expect(200)
        .expect((res) => {
          let body = res.body

          expect(body.result).toBe(false)
          expect(body.user).toBeFalsy()
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let query = {
            name: requestParams.name,
            account: requestParams.account,
          }

          userModel.findOne(query)
            .then((user) => {
              if (user) {
                return done('Should not create user')
              }

              return done()
            })
            .catch(done)
        })
    })

    it('4. should not create a user when value of name is not setted', (done) => {
      let requestParams = {
        name: '',
        account: 'testCaseAccount',
        password: 11111111,
        password2: 11111111
      }

      request(app)
        .post('/API/user/')
        .send(requestParams)
        .expect(200)
        .expect((res) => {
          let body = res.body

          expect(body.result).toBe(false)
          expect(body.user).toBeFalsy()
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let query = {
            name: requestParams.name,
            account: requestParams.account,
          }

          userModel.findOne(query)
            .then((user) => {
              if (user) {
                return done('Should not create user')
              }

              return done()
            })
            .catch(done)
        })
    })

    it('5. should not create a user when value of account is not setted', (done) => {
      let requestParams = {
        name: 'Jay',
        account: '',
        password: 11111111,
        password2: 11111111
      }

      request(app)
        .post('/API/user/')
        .send(requestParams)
        .expect(200)
        .expect((res) => {
          let body = res.body

          expect(body.result).toBe(false)
          expect(body.user).toBeFalsy()
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let query = {
            name: requestParams.name,
            account: requestParams.account,
          }

          userModel.findOne(query)
            .then((user) => {
              if (user) {
                return done('Should not create user')
              }

              return done()
            })
            .catch(done)
        })
    })

    it('6. should not create a user when value of account is used by other one', (done) => {
      requestFirstTime(requestSecondTime)

      function requestFirstTime(cb) {
        let requestParams = {
          name: 'Jay1',
          account: 'testCaseAccount',
          password: 11111111,
          password2: 11111111
        }

        request(app)
          .post('/API/user/')
          .send(requestParams)
          .expect(200)
          .expect((res) => {
            let body = res.body

            expect(body.result).toBe(true)
            expect(body.user.name).toBe(requestParams.name)
            expect(body.user.account).toBe(requestParams.account)
          })
          .end((err, res) => {
            if (err) {
              return done('Check case 1 is successed')
            }

            let query = {
              name: requestParams.name,
              account: requestParams.account
            }

            userModel.findOne(query)
              .then((user) => {
                if (!user) {
                  return done('Check case 1 is successed')
                }

                cb()
              })
              .catch((e) => {
                done('Check case 1 is successed')
              })
          })
      }

      function requestSecondTime() {
        let requestParams = {
          name: 'Jay2',
          account: 'testCaseAccount',
          password: 11111111,
          password2: 11111111
        }

        request(app)
          .post('/API/user/')
          .send(requestParams)
          .expect(200)
          .expect((res) => {
            let body = res.body

            expect(body.result).toBe(false)
            expect(body.user).toBeFalsy()
          })
          .end((err, res) => {
            if (err) {
              return done(err)
            }

            let query = {
              name: requestParams.name,
              account: requestParams.account,
            }

            userModel.findOne(query)
              .then((user) => {
                if (user) {
                  return done('Should not create user')
                }

                return done()
              })
              .catch(done)
          })
      }
    })
  })

  describe('POST /API/user/login --- Login', () => {
    let user = {
      name: 'Jay',
      account: 'testCaseAccount',
      password: '11111111',
      password2: '11111111'
    }

    // create a user
    before(done => {
      let newUser = new userModel(user)
      newUser.save()
        .then(() => {
          done()
        })
        .catch(e => {
          done('Create user error')
        })
    })

    // delete the created user
    after(done => {
      userModel.deleteMany()
        .then(() => {
          done()
        })
    })

    it('1. should login success', (done) => {
      let requestParams = {
        account: user.account,
        password: user.password
      }

      request(app)
        .post('/API/user/login')
        .send(requestParams)
        .expect(200)
        .expect((res) => {
          let body = res.body

          expect(body.result).toBe(true)
          expect(body.user.name).toBe(user.name)
          expect(body.user.account).toBe(user.account)
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let authToken = res.headers['x-auth']

          let query = {
            account: requestParams.account,
            'tokens.token': authToken
          }

          userModel.findOne(query)
            .then((user) => {
              if (!user) {
                return done('User is not logined')
              }

              return done()
            })
            .catch(done)
        })
    })

    it('2. should login fail when value of account is not set', (done) => {
      let requestParams = {
        account: '',
        password: user.password
      }

      request(app)
        .post('/API/user/login')
        .send(requestParams)
        .expect(200)
        .expect((res) => {
          let body = res.body

          expect(body.result).toBe(false)
          expect(body.user).toBeFalsy()
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let authToken = res.headers['x-auth']

          if (authToken) {
            return done('Should not have token')
          }

          done()
        })
    })

    it('3. should login fail when value of password is not set', (done) => {
      let requestParams = {
        account: user.account,
        password: ''
      }

      request(app)
        .post('/API/user/login')
        .send(requestParams)
        .expect(200)
        .expect((res) => {
          let body = res.body

          expect(body.result).toBe(false)
          expect(body.user).toBeFalsy()
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let authToken = res.headers['x-auth']

          if (authToken) {
            return done('Should not have token')
          }

          done()
        })
    })
  })

  describe('GET /API/user --- Authentication', () => {
    let objectId = mongoose.Types.ObjectId()
    let user = {
      _id: objectId,
      name: 'Jay',
      account: 'testAccount',
      password: '11111111',
      tokens: [{
        access: 'auth',
        token: jwt.sign({
          id: objectId,
          access: 'auth',
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3)
        }, process.env.JWT_SECRET)
      }]
    }

    beforeEach(done => {
      userModel(user).save()
        .then(() => {
          done()
        })
        .catch(e => {
          done(e)
        })
    })

    afterEach(done => {
      userModel.deleteMany()
        .then(() => {
          done()
        })
    })

    it('1. should authenticate success', done => {
      request(app)
        .get('/API/user')
        .set('x-auth', user.tokens[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(true)
          expect(res.body.user).toBeTruthy()
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          done()
        })
    })

    it('2. should authenticate fail when the token is not set', done => {
      request(app)
        .get('/API/user')
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
          expect(res.body.user).toBeFalsy()
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          done()
        })
    })

    it('3. should authenticate fail when set error token', done => {
      let errorToken = jwt.sign({
        id: user._id,
        access: 'auth',
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3)
      }, 'ErrorSecret')

      request(app)
        .get('/API/user')
        .set('x-auth', errorToken)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
          expect(res.body.user).toBeFalsy()
        })
        .end((err, res) => {
          if (err) {
            done(err)
          }

          done()
        })
    })
  })

  describe('GET /API/user/follow/:UserAccount --- Follow other person', () => {
    let userId1 = mongoose.Types.ObjectId()
    let userId2 = mongoose.Types.ObjectId()

    let user1 = {
      _id: userId1,
      name: 'Jay1',
      account: 'testAccount1',
      password: '11111111',
      tokens: [{
        access: 'auth',
        token: jwt.sign({
          id: userId1,
          access: 'auth',
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3)
        }, process.env.JWT_SECRET)
      }]
    }
    let user2 = {
      _id: userId2,
      name: 'Jay2',
      account: 'testAccount2',
      password: '11111111'
    }

    beforeEach(done => {
      let promise1 = userModel(user1).save()
      let promise2 = userModel(user2).save()

      Promise.all([promise1, promise2])
        .then((users) => {
          if (!users[0] || !users[1]) {
            return done('Create user fail')
          }

          done()
        })
        .catch(e => {
          done(e)
        })
    })

    afterEach(done => {
      userModel.deleteMany()
        .then(() => {
          done()
        })
        .catch(e => {
          done(e)
        })
    })

    it('1. should user1 follow user2 success', done => {
      request(app)
        .get(`/API/user/follow/${user2.account}`)
        .set('x-auth', user1.tokens[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(true)
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let promise1 = userModel.findOne({
            _id: user1._id,
            following: user2._id
          })
          let promise2 = userModel.findOne({
            _id: user2._id,
            follower: user1._id
          })

          Promise.all([promise1, promise2])
            .then((values) => {
              if (!values[0] || !values[1]) {
                return done('未追蹤成功')
              }

              done()
            })
            .catch(e => {
              done(e)
            })
        })
    })

    it('2. should follow user2 fail when auth token is not offered', done => {
      request(app)
        .get(`/API/user/follow/${user2.account}`)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let promise1 = userModel.findById(userId1)
          let promise2 = userModel.findById(userId2)

          Promise.all([promise1, promise2])
            .then(users => {
              if (!users[0] || !users[1]) {
                return done('未找到欲追蹤之使用者')
              }

              expect(users[0].following.length).toBe(0)
              expect(users[1].follower.length).toBe(0)
              done()
            })
            .catch(e => {
              done(e)
            })
        })
    })

    it('3. should follow self fail', done => {
      request(app)
        .get(`/API/user/follow/${user1.account}`)
        .set('x-auth', user1.tokens[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let promise1 = userModel.findById(userId1)
          let promise2 = userModel.findById(userId2)

          Promise.all([promise1, promise2])
            .then(users => {
              if (!users[0] || !users[1]) {
                return done('未找到欲追蹤之使用者')
              }

              expect(users[0].following.length).toBe(0)
              expect(users[1].follower.length).toBe(0)
              done()
            })
            .catch(e => {
              done(e)
            })
        })
    })
  })

  describe('DELETE /API/user/follow/:UserAccount --- Delete follow someone', () => {
    let userId1 = mongoose.Types.ObjectId()
    let userId2 = mongoose.Types.ObjectId()

    let user1 = {
      _id: userId1,
      name: 'Jay1',
      account: 'testAccount1',
      password: '11111111',
      tokens: [{
        access: 'auth',
        token: jwt.sign({
          id: userId1,
          access: 'auth',
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3)
        }, process.env.JWT_SECRET)
      }],
      following: [
        userId2
      ]
    }
    let user2 = {
      _id: userId2,
      name: 'Jay2',
      account: 'testAccount2',
      password: '11111111',
      follower: [
        userId1
      ]
    }

    beforeEach(done => {
      let promise1 = userModel(user1).save()
      let promise2 = userModel(user2).save()

      Promise.all([promise1, promise2])
        .then((users) => {
          if (!users[0] || !users[1]) {
            return done('Create user fail')
          }

          done()
        })
        .catch(e => {
          done(e)
        })
    })

    afterEach(done => {
      userModel.deleteMany()
        .then(() => {
          done()
        })
        .catch(e => {
          done(e)
        })
    })

    it('1. should user1 delete follow user2 success', done => {
      request(app)
        .delete(`/API/user/follow/${user2.account}`)
        .set('x-auth', user1.tokens[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(true)
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let promise1 = userModel.findOne({
            _id: user1._id,
            following: {
              '$ne': user2._id
            }
          })
          let promise2 = userModel.findOne({
            _id: user2._id,
            follower: {
              '$ne': user1._id
            }
          })

          Promise.all([promise1, promise2])
            .then((values) => {
              if (!values[0] || !values[1]) {
                return done('未退追蹤成功')
              }

              done()
            })
            .catch(e => {
              done(e)
            })
        })
    })

    it('2. should delete follow user2 fail when token is not offered', done => {
      request(app)
        .delete(`/API/user/follow/${user2.account}`)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let promise1 = userModel.findOne({
            _id: user1._id,
            following: user2._id
          })
          let promise2 = userModel.findOne({
            _id: user2._id,
            follower: user1._id
          })

          Promise.all([promise1, promise2])
            .then((values) => {
              if (!values[0] || !values[1]) {
                return done('should delete follow fail')
              }

              done()
            })
            .catch(e => {
              done(e)
            })
        })
    })
  })

  describe('GET /API/user/info --- Get basic information of login user', () => {
    let seedUserId = mongoose.Types.ObjectId()
    let seedUser = {
      _id: seedUserId,
      name: 'Jay',
      account: 'testAccount',
      password: '11111111',
      tokens: [{
        access: 'auth',
        token: jwt.sign({
          id: seedUserId,
          access: 'auth',
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 3)
        }, process.env.JWT_SECRET)
      }]
    }

    beforeEach(done => {
      userModel(seedUser).save()
        .then(user => {
          if (!user) {
            return done('Create user fail')
          }

          return done()
        })
        .catch(done)
    })

    afterEach(done => {
      userModel.deleteMany()
        .then(() => {
          done()
        })
        .catch(done)
    })

    it('1. should get login user info', done => {
      request(app)
        .get('/API/user/info')
        .set('x-auth', seedUser.tokens[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(true)
          expect(res.body.user).toBeTruthy()
          expect(res.body.user._id).toBe(seedUser._id.toString())
          expect(res.body.user.account).toBe(seedUser.account)
          expect(res.body.user.name).toBe(seedUser.name)
          expect(res.body.user.password).toBeFalsy()
          expect(res.body.user.tokens).toBeFalsy()
        })
        .end(done)
    })

    it('2. should not get login user info when token is not offered', done => {
      request(app)
        .get('/API/user/info')
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
          expect(res.body.user).toBeFalsy()
        })
        .end(done)
    })
  })

  describe('GET /API/user/posts --- Get posts of login user\'s and login user\'s following\'s', () => {
    let seedUser1Id = mongoose.Types.ObjectId()
    let seedUser2Id = mongoose.Types.ObjectId()
    let seedPost1Id = mongoose.Types.ObjectId()
    let seedPost2Id = mongoose.Types.ObjectId()
    let seedUser1 = {
      _id: seedUser1Id,
      name: 'Jay1',
      account: 'testAccount1',
      password: '11111111',
      posts:[seedPost1Id],
      following: [seedUser2Id],
      tokens: [{
        access: 'auth',
        token: jwt.sign({
          id: seedUser1Id,
          access: 'auth',
        }, process.env.JWT_SECRET)
      }]
    }
    let seedUser2 = {
      _id: seedUser2Id,
      name: 'Jay2',
      account: 'testAccount2',
      password: '11111111',
      posts: [seedPost2Id],
      tokens: [{
        access: 'auth',
        token: jwt.sign({
          id: seedUser2Id,
          access: 'auth',
        }, process.env.JWT_SECRET)
      }]
    }
    let seedPost1 = {
      _id: seedPost1Id,
      author: seedUser1Id,
      content: 'Post 1'
    }
    let seedPost2 = {
      _id: seedPost2Id,
      author: seedUser2Id,
      content: 'Post 2'
    }

    beforeEach(done => {
      let promise1 = userModel(seedUser1).save()
      let promise2 = userModel(seedUser2).save()
      let promise3 = postModel(seedPost1).save()
      let promise4 = postModel(seedPost2).save()

      Promise.all([promise1, promise2, promise3, promise4])
        .then(value => {
          if (!value[0] || !value[1] || !value[2] || !value[3]) {
            return done('Create document fail')
          }

          done()
        })
        .catch(done)
    })

    afterEach(done => {
      let promise1 = userModel.deleteMany()
      let promise2 = postModel.deleteMany()

      Promise.all([promise1, promise2])
        .then(value => {
          done()
        })
        .catch(done)
    })

    it('1. should get posts of login user\'s and login user\'s following\'s', done => {
      request(app)
        .get('/API/user/posts')
        .set('x-auth', seedUser1.tokens[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(true)
          expect(res.body.posts.length).toBe(2)
        })
        .end(done)
    })

    it('2. should only get posts of login user\'s when login user has no following', done => {
      request(app)
        .get('/API/user/posts')
        .set('x-auth', seedUser2.tokens[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(true)
          expect(res.body.posts.length).toBe(1)
        })
        .end(done)
    })

    it('3. should not get posts when token is not offered', done => {
      request(app)
        .get('/API/user/posts')
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
          expect(res.body.posts).toBeFalsy()
        })
        .end(done)
    })
  })
})
