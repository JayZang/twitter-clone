const expect = require('expect')
const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const { app } = require('../../../server/server')
const userModel = require('../../../server/model/user')
const postModel = require('../../../server/model/post')
const commentModel = require('../../../server/model/comment')

describe('Server: Comment API', () => {
  describe('POST /API/comment/post/:Id --- Comment the post', () => {
    let seedUserId = mongoose.Types.ObjectId()
    let seedPostId = mongoose.Types.ObjectId()
    let seedUser = {
      _id: seedUserId,
      name: 'Jay',
      account: 'testAccount',
      password: '11111111',
      posts: [seedPostId],
      tokens: [{
        access: 'auth',
        token: jwt.sign({
          id: seedUserId,
          access: 'auth'
        }, process.env.JWT_SECRET)
      }]
    }
    let seedPost = {
      _id: seedPostId,
      author: seedUserId,
      content: 'Post 1'
    }

    beforeEach(done => {
      let promise1 = userModel(seedUser).save()
      let promise2 = postModel(seedPost).save()

      Promise.all([promise1, promise2])
        .then(values => {
          if (!values[0] || !values[1]) {
            return done('Create document fail')
          }

          done()
        })
        .catch(done)
    })

    afterEach(done => {
      let promise1 = userModel.deleteMany()
      let promise2 = postModel.deleteMany()
      let promise3 = commentModel.deleteMany()

      Promise.all([promise1, promise2, promise3])
        .then(() => {
          done()
        })
        .catch(done)
    })

    it('1. should create comment successfully', done => {
      let commentParam = {
        content: 'nice'
      }

      request(app)
        .post(`/API/comment/post/${seedPostId}`)
        .set('x-auth', seedUser.tokens[0].token)
        .send(commentParam)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(true)
          expect(res.body.comments).toBeTruthy()
          expect(res.body.comments[0].content).toBe(commentParam.content)
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let promise1 = commentModel.find()
          let promise2 = postModel.findById(seedPostId)

          Promise.all([promise1, promise2])
            .then(values => {
              if (!values[0] || !values[1]) {
                return done('Query document unsuccessfully')
              }

              let comments = values[0]
              let post = values[1]

              expect(comments.length).toBe(1)
              expect(post.comments.length).toBe(1)

              done()
            })
            .catch(done)
        })
    })

    it('2. should create comment unsuccessfully when the token is not offered', done => {
      let commentParam = {
        content: 'nice'
      }

      request(app)
        .post(`/API/comment/post/${seedPostId}`)
        .send(commentParam)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
          expect(res.body.comments).toBeFalsy()
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let promise1 = commentModel.find()
          let promise2 = postModel.findById(seedPostId)

          Promise.all([promise1, promise2])
            .then(values => {
              if (!values[0] || !values[1]) {
                return done('Query document unsuccessfully')
              }

              let comments = values[0]
              let post = values[1]

              expect(comments.length).toBe(0)
              expect(post.comments.length).toBe(0)

              done()
            })
            .catch(done)
        })
    })

    it('3. should create comment unsuccessfully when the parameter of content is empty', done => {
      let commentParam = {
        content: '      '
      }

      request(app)
        .post(`/API/comment/post/${seedPostId}`)
        .set('x-auth', seedUser.tokens[0].token)
        .send(commentParam)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
          expect(res.body.comments).toBeFalsy()
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let promise1 = commentModel.find()
          let promise2 = postModel.findById(seedPostId)

          Promise.all([promise1, promise2])
            .then(values => {
              if (!values[0] || !values[1]) {
                return done('Query document unsuccessfully')
              }

              let comments = values[0]
              let post = values[1]

              expect(comments.length).toBe(0)
              expect(post.comments.length).toBe(0)

              done()
            })
            .catch(done)
        })
    })

    it('4. should create comment unsuccessfully when the parameter of content is not offered', done => {
      let commentParam = {}

      request(app)
        .post(`/API/comment/post/${seedPostId}`)
        .set('x-auth', seedUser.tokens[0].token)
        .send(commentParam)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
          expect(res.body.comments).toBeFalsy()
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let promise1 = commentModel.find()
          let promise2 = postModel.findById(seedPostId)

          Promise.all([promise1, promise2])
            .then(values => {
              if (!values[0] || !values[1]) {
                return done('Query document unsuccessfully')
              }

              let comments = values[0]
              let post = values[1]

              expect(comments.length).toBe(0)
              expect(post.comments.length).toBe(0)

              done()
            })
            .catch(done)
        })
    })
  })
})
