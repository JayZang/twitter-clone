# twitter-web-like

> This project is built using [Node](https://nodejs.org/en/) and [Vue](https://vuejs.org/).  
> The target is learning Vue framework and technique of backend to implement a SPA website.  
> All right of picture and sign is belong to [Twitter](https://twitter.com/).  
> Used techniques, tools and packages by this project are not actually used by [Twitter](https://twitter.com/).  
> Welcome technical exchange, if this project has mistake of code or concept of programming, let me know, thank you:thumbsup:

## Main package

* express
* mongoose
* jsonwebtoken
* vue
* vuex
* vue-router
* axios

## Build Setup

Install all dependency packages:  
(assume has installed [Node](https://nodejs.org/en/) and Node Package Manager(NPM))

``` bash
npm install
```

Serve with hot reload at [localhost:8080](http://localhost:8080/):  
This step only display frontend, backend server is not started yet.

```
npm run dev
```

Start [MongoDB](https://www.mongodb.com/) (assume has installed):

```bash
mongod --dbpath=YOUR_PATH_TO_STORE_DATA
```

Start backend server listening 3001 port on **development** environment to handle API request:

```shell
npm run start:dev
```

Uint test of server API:

```shell
npm run unit
```

If all of unit test is pass, we can link in [localhost:8080](http://localhost:8080/) and should work(sign up, login, etc...) successfully.    

Above steps building application are enough for us to learn `Vue` and `Node`. However, if we want to deploy our project to cloud,  below steps 
are required.

#### Bundle to deploy

Bundle frontend(Vue) code:

```shell
npm run build
```

Start server on **development** environment at [localhost:3001](http://localhost:3001/):  
The different with above step is now we can access our frontend page at [localhost:3001](http://localhost:3001/) and no longer link to localhost:8080.
It means that the server will response bundled frontend page if the http request URL is not for API request.

```shell
npm run start:dev
```

Start server on **production** environment:  
When deploy to cloud, we take [Heroku](https://devcenter.heroku.com/) as a example, the [Heroku](https://devcenter.heroku.com/) will auto run `npm start` 
by default. And we just auto take environment variables(Ex: PORT) of [Heroku](https://devcenter.heroku.com/) system to set up our server to work (Server of 
MongoDB to connect should be configured by yourself).  

```shell
npm start           #same as 'npm run start:prod'
```

Custom configurations can be set at /server/config/config.json
