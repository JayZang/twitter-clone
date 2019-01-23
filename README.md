# twitter-clone

[![build](https://travis-ci.org/JayZang/twitter-clone.svg?branch=master)](https://travis-ci.org/JayZang/twitter-clone)

> This project is built using [Node](https://nodejs.org/en/) and [Vue](https://vuejs.org/).  
> The target is learning Vue framework and technique of backend to implement a SPA website.  
> All right of picture and sign is reserved for [Twitter](https://twitter.com/).  
> Used techniques, tools and packages by this project are not actually used by [Twitter](https://twitter.com/).  
> Welcome technical exchange, if this project has mistake of code or concept of programming, let me know, thanks:thumbsup:

![Demo](https://github.com/JayZang/Twitter-Web-Like/blob/master/Demo.gif?raw=true)

## Main used package

* [express](#express)
* [mongoose](#mongoose)
* [jsonwebtoken](#jsonwebtoken)
* [vue](#vue)
* vuex
* vue-router
* axios

## Feature

* Sign up
* Login
* Post
* Comment
* Follow

## Build Setup

Install all dependency packages: (assume has installed [Node](https://nodejs.org/en/) and NPM)

``` bash
npm install
```

Serve with hot reload at [localhost:8080](http://localhost:8080/):  
This step only can display frontend, backend server is not started yet.

```
npm run dev
```

Run server of [MongoDB](https://www.mongodb.com/): (assume has installed)

```bash
mongod --dbpath=YOUR_PATH_TO_STORE_DATA
```

Run backend server listening 3001 port on **development** environment to handle API request:

```shell
npm run start:dev
```

Unit test of server API:

```shell
npm run unit
```

If all of unit test is pass, we can link in [localhost:8080](http://localhost:8080/) and should work(sign up, login, etc...) successfully.    

Above steps building application are enough for us to learn `Vue` and `Node`. However, if we want to deploy our project to cloud,  below steps 
are required.

### Bundle to deploy

Bundle frontend(Vue) code:

```shell
npm run build
```

Run server on **development** environment at [localhost:3001](http://localhost:3001/):  
The different with above step is now we can access our frontend page at [localhost:3001](http://localhost:3001/) and no longer link to localhost:8080.
It means that the server will response bundled frontend page if the http request URL is not for API request.

```shell
npm run start:dev
```

Run server on **production** environment:  
When deploy to cloud, we take [Heroku](https://devcenter.heroku.com/) as a example, the [Heroku](https://devcenter.heroku.com/) will auto run `npm start` 
by default. And we just auto take environment variables(Ex: PORT) of [Heroku](https://devcenter.heroku.com/) system to set up our server to work (Server of 
MongoDB to connect should be configured by yourself)  

```shell
npm start           #same as 'npm run start:prod'
```

Custom configurations can be set at /server/config/config.json

## Simple Introduction

### Express

[Official document](https://expressjs.com/zh-tw/guide/routing.html)  
Use RESTful routes to handle http request.

```javascript
const app = require('expess')

app.get('/', (req, res, next) => {
  res.json({
    res: 'This is GET method'
  })
})
app.post('/', (req, res, next) => {
    res.json({
      res: 'This is POST method'
    })
})
app.delete('/', (req, res, next) => {
  res.json({
    res: 'This is DELETE method'
  })
})
app.update('/', (req, res, next) => {
  res.json({
    res: 'This is UPDATE method'
  })
})
```

### Mongoose

[Official document](https://mongoosejs.com/docs/guide.html)  
Use relational database.  
This project has three models:

* Users
* Posts
* Comments

Schema setting:

```javascript
const userSchema = mongoose.Schema({
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Posts'
  }],
  //...
})
const postSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comments'
  }],
  //...
})
const commentSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users'
  },
  target: {
    model: String,
    id: mongoose.Schema.Types.ObjectId()
  },
  //...
})

const userModel = mongoose.Model('Users', userSchema)
const postModel = mongoose.Model('Posts', postSchema)
const commentModel = mongoose.Model('Comments', commentSchema)
```

Get populated data:

```javascript
userModel.findById(USER_ID)
  .then(user => {
    if (!user) {
      //...
    }
    
    let opt = {
      path: 'posts',
      populate: {
        path: 'comments'
      }
    }
    
    user.populate(opt).execPopulate()
      .then(populatedUser => {
        // Do what tou want to do
      }).
      catch(e => {
        //...
      })
  })
  .catch(e => {
    //...
  })
```

### Jsonwebtoken

[Official document](https://github.com/auth0/node-jsonwebtoken)  
Create an token and it will be invalid after 1 hour.  
You can put some data into token to let server know this token's owner and information.

```javascript
const jwt = require('jsonwebtoken')

const token = jwt.sign({
  id: USER_ID,
  access: 'auth',
  exp: Math.floor(Date.now() / 1000) + (60 * 60 * 1)
}, 'YOUR_SECRET_KEY')
```

Token verification:

```javascript
try {
  let data = jwt.verify(RECEIVED_TOKEN, 'YOUR_SECRET_KEY')
} catch (e) {
  // Verify fail
}
```

### Vue

[Official document](https://cn.vuejs.org/v2/guide/index.html)  
The following picture shows the life cycle of a instance component.  
I think it is the most important thing to understand each event when will be invoked.  

![Vue component's life cycle](https://cn.vuejs.org/images/lifecycle.png)


If we have the component needs props of 'userID' to get user's info async.  
When the components is instanced, function of `created` will be invoked and get user's information by current 'userID'. 
But if the next route also has this component and has different props of 'userID', this component is reused rather than
instance a new component again. At this time the `created` function is not invoked, so the other method is using `watch`
property to monitor the 'userID' props change or not, if the indicated target change, the function you set will be invoked. 

```javascript
Vue.component('your-component', {
  props:['userID'],
  data: function () {
    return {
      user: null
    }
  },
  created() {
    this.getUserInfo()
  },
  watch: {
    // here is important
    'userID': 'getUserInfo'
  },
  method: {
    getUserInfo() {
      // Some http Request to get user information from server
    }
  },
  template: '<div v-if="user">{{ user.name }}</div>'
})
```
