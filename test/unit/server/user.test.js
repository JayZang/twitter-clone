const expect = require('expect')
const request = require('supertest');

const { app } = require('../../../server/server')
const userModel = require('../../../server/model/user')

describe('Server Test Case', () => {
  describe('User API', () => {
    describe('POST /API/user/ --- Regist', () => {
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
      before((done) => {
        let newUser = new userModel(user)
        newUser.save()
          .then(() => {
            done()
          })
          .catch(e => {
            done('Create user error')
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

      it('2. should login fail when value of account is not setted', (done) => {
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

      it('3. should login fail when value of password is not setted', (done) => {
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
  })
})
