const expect = require('expect')
const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const { app } = require('../../../server/server')
const userModel = require('../../../server/model/user')

describe('Server: Search API', () => {
  describe('Get /API/search/person/:query --- Fuzzy search users by name', () => {
    let seedUserId1 = mongoose.Types.ObjectId()
    let seedUserId2 = mongoose.Types.ObjectId()
    let seedUserId3 = mongoose.Types.ObjectId()

    let seedUser1 = {
      _id: seedUserId1,
      name: 'Jay1',
      account: 'testAccount1',
      password: 11111111
    }
    let seedUser2 = {
      _id: seedUserId2,
      name: 'Jay2',
      account: 'testAccount2',
      password: 11111111
    }
    let seedUser3 = {
      _id: seedUserId3,
      name: 'Other',
      account: 'testAccount3',
      password: 11111111
    }

    beforeEach(done => {
      let promise1 = userModel(seedUser1).save()
      let promise2 = userModel(seedUser2).save()
      let promise3 = userModel(seedUser3).save()

      Promise.all([promise1, promise2, promise3])
        .then(values => {
          if (!values[0] || !values[1] || !values[2]) {
            return done('Create document fail')
          }

          done()
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

    it('1. should search users successfully when user\'s name is part of match to the query', done => {
      let searchTxt = 'Jay'

      request(app)
        .get(`/API/search/person/${searchTxt}`)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(true)
          expect(res.body.users).toBeTruthy()
          expect(res.body.users.length).toBe(2)
        })
        .end(done)
    })

    it('1. should search no user when all user\'s name is not include the query text', done => {
      let searchTxt = 'hello'

      request(app)
        .get(`/API/search/person/${searchTxt}`)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(true)
          expect(res.body.users).toBeTruthy()
          expect(res.body.users.length).toBe(0)
        })
        .end(done)
    })
  })
})
