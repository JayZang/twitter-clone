const expect = require('expect')
const request = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const { app } = require('../../../server/server')
const userModel = require('../../../server/model/user')
const postModel = require('../../../server/model/post')
const commentModel = require('../../../server/model/comment')

describe('Server: Post API', () => {
  describe('POST /API/post/ --- Create new post', () => {
    let seedUserId = mongoose.Types.ObjectId()
    let seedUser = {
      _id: seedUserId,
      name: 'Jay',
      account: 'testAccount1',
      password: '11111111',
      posts: [],
      tokens: [{
        access: 'auth',
        token: jwt.sign({
          id: seedUserId,
          access: 'auth'
        }, process.env.JWT_SECRET)
      }]
    }

    beforeEach(done => {
      userModel(seedUser).save()
        .then(user => {
          if (!user) {
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

    it('1. should create a post success', done => {
      let postParam = {
        content: 'Hello Post'
      }

      request(app)
        .post('/API/post')
        .set('x-auth', seedUser.tokens[0].token)
        .send(postParam)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(true)
          expect(res.body.post).toBeTruthy()
          expect(res.body.post.content).toBe(postParam.content)
          expect(res.body.post.author._id).toBe(seedUser._id.toString())
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let promise1 = postModel.find()
          let promise2 = userModel.findById(seedUser._id)

          Promise.all([promise1, promise2])
            .then(values => {
              if (!values[0] || !values[1]) {
                return done('Document not found')
              }

              let posts = values[0]
              let user = values[1]

              expect(user.posts.length).toBe(1)
              expect(posts.length).toBe(1)

              done()
            })
            .catch(done)
        })
    })

    it('2. should create a post fail when token is not offered', done => {
      let postParam = {
        content: 'Hello Post'
      }

      request(app)
        .post('/API/post')
        .send(postParam)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
          expect(res.body.post).toBeFalsy()
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let promise1 = postModel.find()
          let promise2 = userModel.findById(seedUser._id)

          Promise.all([promise1, promise2])
            .then(values => {
              if (!values[0] || !values[1]) {
                return done('Document not found')
              }

              let posts = values[0]
              let user = values[1]

              expect(user.posts.length).toBe(0)
              expect(posts.length).toBe(0)

              done()
            })
            .catch(done)
        })
    })

    it('3. should create a post fail when parameters of content is not set', done => {
      let postParam = {
      }

      request(app)
        .post('/API/post')
        .set('x-auth', seedUser.tokens[0].token)
        .send(postParam)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
          expect(res.body.post).toBeFalsy()
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let promise1 = postModel.find()
          let promise2 = userModel.findById(seedUser._id)

          Promise.all([promise1, promise2])
            .then(values => {
              if (!values[0] || !values[1]) {
                return done('Document not found')
              }

              let posts = values[0]
              let user = values[1]

              expect(user.posts.length).toBe(0)
              expect(posts.length).toBe(0)

              done()
            })
            .catch(done)
        })
    })

    it('4. should create a post fail when parameters of content is empty', done => {
      let postParam = {
        content: '   '
      }

      request(app)
        .post('/API/post')
        .set('x-auth', seedUser.tokens[0].token)
        .send(postParam)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
          expect(res.body.post).toBeFalsy()
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          let promise1 = postModel.find()
          let promise2 = userModel.findById(seedUser._id)

          Promise.all([promise1, promise2])
            .then(values => {
              if (!values[0] || !values[1]) {
                return done('Document not found')
              }

              let posts = values[0]
              let user = values[1]

              expect(user.posts.length).toBe(0)
              expect(posts.length).toBe(0)

              done()
            })
            .catch(done)
        })
    })
  })

  describe('GET /API/post/:Id/like --- Like or delete like the post', () => {
    let seedUserId = mongoose.Types.ObjectId()
    let seedPost1Id = mongoose.Types.ObjectId()
    let seedPost2Id = mongoose.Types.ObjectId()
    let seedUser = {
      _id: seedUserId,
      name: 'Jay',
      account: 'testAccount1',
      password: '11111111',
      posts: [seedPost1Id, seedPost2Id],
      tokens: [{
        access: 'auth',
        token: jwt.sign({
          id: seedUserId,
          access: 'auth'
        }, process.env.JWT_SECRET)
      }]
    }

    // post1 has no like
    let seedPost1 = {
      _id: seedPost1Id,
      author: seedUserId,
      content: 'Post1'
    }

    // post2 has one like
    let seedPost2 = {
      _id: seedPost2Id,
      author: seedUserId,
      content: 'Post2',
      likes: [seedUserId]
    }

    beforeEach(done => {
      let promise1 = userModel(seedUser).save()
      let promise2 = postModel(seedPost1).save()
      let promise3 = postModel(seedPost2).save()

      Promise.all([promise1, promise2, promise3])
        .then(value => {
          if (!value[0] || !value[1] || !value[2]) {
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

    it('1. should like a post success', done => {
      request(app)
        .get(`/API/post/${seedPost1Id}/like`)
        .set('x-auth', seedUser.tokens[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(true)
          expect(res.body.likes).toBeTruthy()
          expect(res.body.likes.length).toBe(1)
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          postModel.findById(seedPost1Id)
            .then(post => {
              if (!post) {
                return done('Post not found')
              }

              expect(post.likes.length).toBe(1)
              done()
            })
            .catch(done)
        })
    })

    it('2. should delete like a post success', done => {
      request(app)
        .get(`/API/post/${seedPost2Id}/like`)
        .set('x-auth', seedUser.tokens[0].token)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(true)
          expect(res.body.likes).toBeTruthy()
          expect(res.body.likes.length).toBe(0)
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          postModel.findById(seedPost2Id)
            .then(post => {
              if (!post) {
                return done('Post not found')
              }

              expect(post.likes.length).toBe(0)
              done()
            })
            .catch(done)
        })
    })

    it('3. should like a post fail when token is not offered', done => {
      request(app)
        .get(`/API/post/${seedPost1Id}/like`)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
          expect(res.body.likes).toBeFalsy()
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          postModel.findById(seedPost1Id)
            .then(post => {
              if (!post) {
                return done('Post not found')
              }

              expect(post.likes.length).toBe(0)
              done()
            })
            .catch(done)
        })
    })

    it('4. should delete like a post fail when token is not offered', done => {
      request(app)
        .get(`/API/post/${seedPost2Id}/like`)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
          expect(res.body.likes).toBeFalsy()
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }

          postModel.findById(seedPost2Id)
            .then(post => {
              if (!post) {
                return done('Post not found')
              }

              expect(post.likes.length).toBe(1)
              done()
            })
            .catch(done)
        })
    })
  })

  describe('GET /API/post/:Id --- Return detail information of the post about post content, author, who likes, all comments content', () => {
    let seedUserId = mongoose.Types.ObjectId()
    let seedPostId = mongoose.Types.ObjectId()
    let seedCommentId = mongoose.Types.ObjectId()
    let seedUser = {
      _id: seedUserId,
      name: 'Jay',
      account: 'testAccount',
      password: '11111111',
      posts: [seedPostId]
    }
    let seedPost = {
      _id: seedPostId,
      author: seedUserId,
      content: 'Post 1',
      likes: [seedUserId],
      comments: [seedCommentId]
    }
    let seedComment = {
      _id: seedCommentId,
      user: seedUserId,
      content: 'nice',
      target: {
        model: 'Posts',
        id: seedPostId
      }
    }

    beforeEach(done => {
      let promise1 = userModel(seedUser).save()
      let promise2 = postModel(seedPost).save()
      let promise3 = commentModel(seedComment).save()

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
      let promise1 = userModel.deleteMany()
      let promise2 = postModel.deleteMany()
      let promise3 = commentModel.deleteMany()

      Promise.all([promise1, promise2, promise3])
        .then(() => {
          done()
        })
        .catch(done)
    })

    it('1. should get all detail info of the post success', done => {
      request(app)
        .get(`/API/post/${seedPostId}`)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(true)
          expect(res.body.post).toBeTruthy()
          expect(res.body.post.content).toBe(seedPost.content)
          expect(res.body.post.author._id).toBe(seedUserId.toString())
          expect(res.body.post.author.name).toBe(seedUser.name)
          expect(res.body.post.author.account).toBe(seedUser.account)
          expect(res.body.post.comments[0].user._id).toBe(seedUserId.toString())
          expect(res.body.post.comments[0].content).toBe(seedComment.content)
        })
        .end(done)
    })

    it('2. should not get info of the post which is not exist', done => {
      request(app)
        .get(`/API/post/${seedPostId}123`)
        .expect(200)
        .expect(res => {
          expect(res.body.result).toBe(false)
          expect(res.body.post).toBeFalsy()
        })
        .end(done)
    })
  })
})
