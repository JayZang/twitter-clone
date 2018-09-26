const expect = require('expect')
const request = require('supertest')
const mongoose = require('mongoose')

const { app } = require('../../../server/server')
const userModel = require('../../../server/model/user')
const postModel = require('../../../server/model/post')

describe('Server: Person API', () => {
  describe('GET /API/person/:account --- Get basic information of the indicated person', () => {
    let seedUserId = mongoose.Types.ObjectId()
    let seedUser = {
      _id: seedUserId,
      name: 'Jay',
      account: 'testAccount',
      password: '11111111'
    }

    beforeEach(done => {
      userModel(seedUser).save()
        .then(user => {
          if (!user) {
            return done('Create user fail')
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

    it('1. should get basic info success', done => {
      request(app)
        .get(`/API/person/${seedUser.account}`)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(true)
          expect(res.body.person._id).toBe(seedUser._id.toString())
        })
        .end(done)
    })

    it('2. should get info fail when the parameter account is not exist', done => {
      request(app)
        .get(`/API/person/${seedUser.account}123`)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
          expect(res.body.person).toBeFalsy()
        })
        .end(done)
    })
  })

  describe('GET /API/person/:account/following --- Get list of person who the indicated person is following', () => {
    let seedUser1Id = mongoose.Types.ObjectId()
    let seedUser2Id = mongoose.Types.ObjectId()
    let seedUser3Id = mongoose.Types.ObjectId()
    let seedUser1 = {
      _id: seedUser1Id,
      name: 'Jay',
      account: 'testAccount1',
      password: '11111111',
      following: [seedUser2Id, seedUser3Id]
    }
    let seedUser2 = {
      _id: seedUser2Id,
      name: 'Jay2',
      account: 'testAccount2',
      password: '11111111',
      follower: [seedUser1Id]
    }
    let seedUser3 = {
      _id: seedUser3Id,
      name: 'Jay3',
      account: 'testAccount3',
      password: '11111111',
      follower: [seedUser1Id]
    }

    beforeEach(done => {
      let promise1 = userModel(seedUser1).save()
      let promise2 = userModel(seedUser2).save()
      let promise3 = userModel(seedUser3).save()

      Promise.all([promise1, promise2, promise3])
        .then(users => {
          if (!users[0] || !users[1] || !users[2]) {
            return done('Create user fail')
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

    it('1. should get following success', done => {
      request(app)
        .get(`/API/person/${seedUser1.account}/following`)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(true)
          expect(res.body.following.length).toBe(seedUser1.following.length)
        })
        .end(done)
    })

    it('2. should get following fail when the parameter account is not exist', done => {
      request(app)
        .get(`/API/person/${seedUser1.account}123/following`)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
          expect(res.body.following).toBeFalsy()
        })
        .end(done)
    })
  })

  describe('GET /API/person/:account/follower --- Get list of person who is following the indicated person ', () => {
    let seedUser1Id = mongoose.Types.ObjectId()
    let seedUser2Id = mongoose.Types.ObjectId()
    let seedUser3Id = mongoose.Types.ObjectId()
    let seedUser1 = {
      _id: seedUser1Id,
      name: 'Jay',
      account: 'testAccount1',
      password: '11111111',
      follower: [seedUser2Id, seedUser3Id]
    }
    let seedUser2 = {
      _id: seedUser2Id,
      name: 'Jay2',
      account: 'testAccount2',
      password: '11111111',
      following: [seedUser1]
    }
    let seedUser3 = {
      _id: seedUser3Id,
      name: 'Jay3',
      account: 'testAccount3',
      password: '11111111',
      following: [seedUser1]
    }

    beforeEach(done => {
      let promise1 = userModel(seedUser1).save()
      let promise2 = userModel(seedUser2).save()
      let promise3 = userModel(seedUser3).save()

      Promise.all([promise1, promise2, promise3])
        .then(users => {
          if (!users[0] || !users[1] || !users[2]) {
            return done('Create user fail')
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

    it('1. should get follower success', done => {
      request(app)
        .get(`/API/person/${seedUser1.account}/follower`)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(true)
          expect(res.body.follower.length).toBe(seedUser1.follower.length)
        })
        .end(done)
    })

    it('2. should get follower fail when the parameter account is not exist', done => {
      request(app)
        .get(`/API/person/${seedUser1.account}123/follower`)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
          expect(res.body.follower).toBeFalsy()
        })
        .end(done)
    })
  })

  describe('GET /API/person/:account/posts --- Get posts of the indicated person', () => {
    let seedUserId = mongoose.Types.ObjectId()
    let seedPostId = mongoose.Types.ObjectId()
    let seedUser = {
      _id: seedUserId,
      name: 'Jay',
      account: 'testAccount1',
      password: '11111111',
      posts: [seedPostId]
    }
    let seedPost = {
      _id: seedPostId,
      author: seedUserId,
      content: 'Post'
    }

    beforeEach(done => {
      let promise1 = userModel(seedUser).save()
      let promise2 = postModel(seedPost).save()

      Promise.all([promise1, promise2])
        .then(value => {
          if (!value[0] || !value[1]) {
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
        .then(() => {
          done()
        })
        .catch(done)
    })

    it('1. should get posts success', done => {
      request(app)
        .get(`/API/person/${seedUser.account}/posts`)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(true)
          expect(res.body.posts.length).toBe(seedUser.posts.length)
        })
        .end(done)
    })

    it('2. should get posts fail when the parameter account is not exist', done => {
      request(app)
        .get(`/API/person/${seedUser.account}123/posts`)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
          expect(res.body.posts).toBeFalsy()
        })
        .end(done)
    })
  })
})
