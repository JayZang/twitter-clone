<template lang="html">
  <div class="FollowBtnContainer" v-if="!isLoginedUser">
    <button class="FollowBtn" v-if="!isFollowing" @click="followClickEventHandler">追蹤</button>
    <button class="BackFollowBtn" v-if="isFollowing" @mouseenter="backFollowMouseEnterEventHandler" @mouseleave="backFollowMouseLeaveEventHandler" @click="backFollowClickEventHandler">{{followingBtnTxt}}</button>
  </div>
</template>

<script>
import UserAction from '@/API/User/Action'

export default {
  name: 'FollowBtn',
  props: ['userId', 'following'],
  data () {
    return {
      isFollowing: this.following,
      followingBtnTxt: '追蹤中'
    }
  },
  computed: {
    isLoginedUser: function () {
      return this.userId === this.$store.getters.userAccount
    }
  },
  methods: {
    async followClickEventHandler (e) {
      if (!this.$store.getters.isLogin) {
        this.$router.push('/login')
      } else if (this.isLoginedUser) {
        return
      }

      let res = await UserAction.follow(this.userId, this.$store.getters.authToken)

      if (!res.result)
        return

      this.isFollowing = true
      this.followingBtnTxt = '追蹤中'
    },
    async backFollowClickEventHandler (e) {
      if (!this.$store.getters.isLogin) {
        this.$router.push('/login')
      } else if (this.isLoginedUser) {
        return
      }

      let res = await UserAction.deleteFollow(this.userId, this.$store.getters.authToken)

      if (!res.result)
        return

      this.isFollowing = false
      this.followingBtnTxt = '追蹤'
    },
    backFollowMouseEnterEventHandler (e) {
      this.isFollowing && (this.followingBtnTxt = '取消追蹤')
    },
    backFollowMouseLeaveEventHandler (e) {
      this.isFollowing &&  (this.followingBtnTxt = '追蹤中')
    }
  }
}
</script>

<style lang="css" scoped>
.FollowBtnContainer {
    margin-left: auto;
    display: flex;
    align-items: center;
}

.FollowBtn {
  padding: 6px 16px;
  border: 1px solid #0084B4;
  color: #0084B4;
  display: inline-block;
  font-size: 14px;
  border-radius: 100px;
  min-width: 105px;
  outline: none;
  cursor: pointer;
}

.BackFollowBtn {
  padding: 6px 16px;
  background-color: #329CC3;
  border: 0;
  color: white;
  display: inline-block;
  font-size: 14px;
  border-radius: 100px;
  min-width: 105px;
  outline: none;
  cursor: pointer;
}

.BackFollowBtn:hover {
  background-color: #e0245e;
}

.FollowBtn:hover {
    background-color: #E5F2F7;
}
</style>
