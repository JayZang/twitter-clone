<template lang="html">
  <div class="UserHomeContainer">
    <div class="UserHomeWrapper">
      <div class="LeftSideContainer">
        <div class="ProfileCardContainer" v-if="user">
          <router-link tag="div" :to="{name: 'PersonPosts', params: {PersonAccount: userAccount}}" class="ProfileWallImg" :style="`background-image: url(${userWallImg})`"></router-link>
          <div class="ProfileContentContainer">
            <router-link tag="img" :to="{name: 'PersonPosts', params: {PersonAccount: userAccount}}" :src="userImg" class="ProfileUserImg"></router-link>
            <div class="ProfileName">
              <router-link tag="span" :to="{name: 'PersonPosts', params: {PersonAccount: userAccount}}">{{userName}}</router-link>
            </div>
            <div class="ProfileAccount">
              <router-link tag="span" :to="{name: 'PersonPosts', params: {PersonAccount: userAccount}}">@{{userAccount}}</router-link>
            </div>
            <div class="ProfileInfo">
              <div class="ProfilePosts">
                <div class="Title">
                  <span>推文</span>
                </div>
                <div class="Count">
                  <span>{{userPostsCount}}</span>
                </div>
              </div>
              <div class="ProfileFollowing">
                <div class="Title">
                  <span>追蹤中</span>
                </div>
                <div class="Count">
                  <span>{{userFollowingCount}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="RightSideContainer">
        <LoadingAnimationComponent :class="{loadingAnimation: true, loaded: postLoaded}" />
        <PostCreaterComponent @newPost="newPostEventHandler"/>
        <PostsBoxComponent :posts="posts" detailPostRouteName="UserDetailPostInfo" v-if="postLoaded"/>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import UserInfoAPI from '@/API/User/Info'
import PostCreaterComponent from '@/components/Post/PostCreater'
import PostsBoxComponent from '@/components/Post/PostsBox'
import LoadingAnimationComponent from '@/components/Animate/Loading'

export default {
  name: 'UserHome',
  components: {
    PostCreaterComponent,
    PostsBoxComponent,
    LoadingAnimationComponent
  },
  data () {
    return {
      user: null,
      posts: [],
      userLoaded: false,
      postLoaded: false,
      errorMessage: ''
    }
  },
  computed: {
    userName: function () {
      return this.user ? this.user.name : ''
    },
    userAccount: function () {
      return this.user ? this.user.account : ''
    },
    userImg: function () {
      return this.user ? this.user.profileImg : ''
    },
    userWallImg: function () {
      return this.user ? this.user.bkgWallImg : ''
    },
    userPostsCount: function () {
      return this.user ? this.user.posts.length : 0
    },
    userFollowingCount: function () {
      return this.user ? this.user.following.length : 0
    }
  },
  mounted () {
    this.getUserInfo()
    this.getPosts()
  },
  methods: {
    getUserInfo: async function () {
      this.userLoaded = false
      this.user = null

      let res = await UserInfoAPI.getBasicInfo()
      this.userLoaded = true

      if (!res.result) {
        console.log(res)
        return
      }

      this.user = res.user
      document.title = `${this.user.name} (@${this.user.account}) | Twitter`
    },
    getPosts: async function () {
      this.postLoaded = false
      this.posts = []

      let res = await UserInfoAPI.getPosts()
      this.postLoaded = true

      if (!res.result) {
        console.log(res)
        return
      }

      this.posts = res.posts
    },
    newPostEventHandler (newPost) {
      this.posts.unshift(newPost)
    }
  }
}
</script>

<style lang="css" scoped>
.UserHomeContainer {
  margin-top: 46px;
  min-height: calc(100vh - 46px);
  background-color: #e6ecf0;
}

.UserHomeWrapper {
  max-width: 890px;
  margin: 0 auto;
  padding: 8px 14px 15px;
  display: flex;
}

.ProfileCardContainer {
  position: relative;
  background-color: white;
}

.LeftSideContainer {
    width: 290px;
    position: fixed;
}

.ProfileWallImg {
  height: 95px;
  background-position: center;
  background-size: cover;
  cursor: pointer;
}

.ProfileUserImg {
  border-radius: 50%;
  height: 72px;
  width: 72px;
  border: 2px solid #fff;
  box-sizing: border-box;
  overflow: hidden;
  color: #fff;
  margin: -30px 0 0 8px;
  cursor: pointer;
}

.ProfileName {
  position: absolute;
  top: 103px;
  left: 90px;
  width: 185px;
  font-weight: bold;
  font-size: 18px;
}

.ProfileAccount {
  position: absolute;
  top: 130px;
  left: 90px;
  width: 185px;
  font-size: 12px;
  color: #66757f;
}

.ProfileName span,
.ProfileAccount span {
  cursor: pointer;
}

.ProfileInfo {
  padding: 16px;
  display: flex;
}

.ProfilePosts,
.ProfileFollowing {
  width: 50%;
  font-size: 12px;
  font-weight: bold;
  color: #657786;
}

.Count {
  color: #1DA1F2;
  font-size: 18px;
  font-weight: bold;
  padding-top: 3px;
}

.RightSideContainer {
  margin-left: 12px;
  width: calc(100% - 300px);
  margin-left: auto;
}

.loadingAnimation {
  height: 100px;
  overflow: hidden;
  transition: 1s;
  display: flex;
  align-items: center;
}

.loadingAnimation.loaded {
  height: 0;
}
</style>
