<template lang="html">
  <div id="TopNavBar">
    <div class="Navbar">
      <div class="left-side">
        <router-link to="/" class="home-btn-link">
          <div class="link-wrapper">
            <span class="twitter-img">
              <img src="/static/img/twitter-bird.png" alt="">
            </span>
            <span>首頁</span>
          </div>
        </router-link>
      </div>
      <div class="right-side">
        <SearchBar />
        <div class="UserStatusContainer" v-if="isLogin">
          <img :src="user.profileImg" class="UserImg" @click.stop="showStatus = !showStatus">
          <div class="StatusContainer" v-if="showStatus">
            <router-link tag="div" :to="`/${user.account}`" class="UserInfo">
              <div class="Name">{{user.name}}</div>
              <div class="Account">@{{user.account}}</div>
            </router-link>
            <div class="divider"></div>
            <div class="Btns">
              <div class="BtnItem" @click.stop="logout">登出</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchBar from './SearchBar'

export default {
  name: 'TopNavBar',
  components: {
    SearchBar
  },
  data() {
    return {
      isLogin: this.$store.getters.isLogin,
      user: this.$store.state.Auth.user,
      showStatus: false
    }
  },
  watch: {
    '$store.getters.isLogin': function () {
      this.isLogin = this.$store.getters.isLogin
      this.user = this.$store.state.Auth.user
    },
    '$route': function () {
      this.showStatus = false
    }
  },
  methods: {
    logout() {
      this.$store.dispatch('logout')
      window.location.reload()
    }
  }
}
</script>

<style lang="css" scoped>
#TopNavBar {
  box-shadow: 0 0 6px rgba(0,0,0,0.2);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1000;
  background-color: white;
}

#TopNavBar .Navbar {
  height: 46px;
  max-width: 865px;
  margin: 0 auto;
  display: flex;
}

#TopNavBar .twitter-img img {
  width: 23px;
}

#TopNavBar .home-btn-link {
  color: #66757f;
  text-decoration: none;
  height: 100%;
  display: block;
  position: relative;
  transition: 400ms;
}

#TopNavBar .home-btn-link:hover {
    color: #1da1f2;
}

#TopNavBar .home-btn-link:after {
  content: '';
  display: block;
  width: 100%;
  height: 2px;
  position: absolute;
  background-color: #1c94e0;
  bottom: 0;
  transition: 400ms ease;
  opacity: 0;
}

#TopNavBar .home-btn-link:hover:after {
  opacity: 1;
}

#TopNavBar .link-wrapper {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 12px;
}

#TopNavBar .right-side {
  flex-grow: 1;
  justify-content: flex-end;
  display: flex;
  align-items: center;
}

#TopNavBar .UserStatusContainer {
  position: relative;
}

#TopNavBar .UserStatusContainer .divider {
  padding-top: 1px;
  margin: 5px 1px 6px;
  border-bottom: 1px solid #e6ecf0;
}

#TopNavBar .UserImg {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 10px;
  cursor: pointer;
}

#TopNavBar .UserInfo {
  padding: 0 16px;
  cursor: pointer;
}

#TopNavBar .UserInfo .Name{
  font-size: 18px;
  line-height: 24px;
  white-space: nowrap;
  word-break: break-all;
  color: #14171a;
  font-weight: bold;
}

#TopNavBar .UserInfo .Account {
  color: #657786;
}

#TopNavBar .StatusContainer {
  position: absolute;
  background-color: white;
  min-width: 192px;
  padding: 10px 0;
  margin: 10px 0 0;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.25);
  right: 0;
  border: 1px solid rgba(0,0,0,0.1);
  z-index: 100;
}

#TopNavBar .StatusContainer:after {
  content: '';
  display: inline-block;
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: white;
  transform: rotate(45deg);
  top: -7px;
  right: 19px;
  border-left: 1px solid rgba(0,0,0,0.1);
  border-top: 1px solid rgba(0,0,0,0.1);
}

#TopNavBar .StatusContainer .BtnItem {
  color: #14171a;
  font-size: 14px;
  line-height: 20px;
  padding: 8px 16px;
  cursor: pointer;
}

#TopNavBar .StatusContainer .BtnItem:hover {
  background-color: #1DA1F2;
  color: white;
}
</style>
