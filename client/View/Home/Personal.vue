<template lang="html">
  <div id="PersonalHome" :fix="needPersonalWallFix">
    <ErrorMessageBar v-if="errorMessage" :text="errorMessage"/>
    <div class="PersonalWall">
      <div class="WallImgContainer">
        <div class="BkgImgContainer" :style="`background-image: url(${personBkgImg})`"></div>
        <div class="ProfileImgContainer">
          <div class="ProfileImg">
            <a href="#" class="ProfileImgLink">
              <img :src="personImg" alt="">
            </a>
          </div>
        </div>
      </div>
      <div class="ProfileInfoContainer">
        <div class="ProfileInfoWrapper">
          <div class="CardContainer">
            <div class="ImgWrapper">
              <a href="#">
                <img :src="personImg" alt="">
              </a>
            </div>
            <div class="NameInfo">
              <span>{{personName}}</span>
            </div>
          </div>
          <div class="TabContainer">
            <router-link :to="{name: 'PersonPosts', params: {PersonAccount: personAccount}}" class="TabItem" exact-active-class="active">
              <div class="TabTxt">
                <div class="TabTitle">推文</div>
                <div class="Count">{{postsCount}}</div>
              </div>
            </router-link>
            <router-link :to="{name: 'PersonFollowing', params: {PersonAccount: personAccount}}" class="TabItem" exact-active-class="active">
              <div class="TabTxt">
                <div class="TabTitle">正在跟隨</div>
                <div class="Count">{{followingCount}}</div>
              </div>
            </router-link>
            <router-link :to="{name: 'PersonFollower', params: {PersonAccount: personAccount}}" class="TabItem" exact-active-class="active">
              <div class="TabTxt">
                <div class="TabTitle">跟隨者</div>
                <div class="Count">{{followerCount}}</div>
              </div>
            </router-link>
            <!-- <router-link to="">
              <div class="TabTxt">
                <div class="TabTitle">喜歡的內容</div>
                <div class="Count">12345</div>
              </div>
            </router-link> -->
          </div>
          <FollowBtn :following="isFollowing" :userId="personAccount"/>
        </div>
      </div>
    </div>
    <div class="WallContent">
      <div class="ContentContainer">
        <div class="LeftSideContent"></div>
        <div class="RightSideContent">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FollowBtn from '@/components/Btns/Follow'
import ErrorMessageBar from '@/components/Bar/ErrorMessageBar'
import personInfo from '@/API/Person/info'

export default {
  name: 'PersonalHome',
  components: {
    FollowBtn,
    ErrorMessageBar
  },
  data () {
    return {
      personAccount: null,
      person: null,
      needPersonalWallFix: false,
      isFollowing: false,
      errorMessage: ''
    }
  },
  computed: {
    isLoginedUser: function () {
      return this.personAccount === this.$store.getters.userAccount
    },
    postsCount: function () {
      return this.person ? this.person.posts.length : 0
    },
    followingCount: function () {
      return this.person ? this.person.following.length : 0
    },
    followerCount: function () {
      return this.person ? this.person.follower.length : 0
    },
    personName: function () {
      return this.person ? this.person.name : ''
    },
    personID: function () {
      return this.person ? this.person._id : null
    },
    personImg: function () {
      return this.person ? this.person.profileImg : ''
    },
    personBkgImg: function () {
      return this.person ? this.person.bkgWallImg : ''
    }
  },
  created () {
    this.initUserID()
    window.addEventListener('scroll', this.windowScrollEventHandelr)
  },
  watch: {
    '$route.params.PersonAccount': 'initUserID'
  },
  methods: {
    async initUserID () {
      this.personAccount = this.$route.params.PersonAccount

      let res = await personInfo.GetPersonBasicInfo(this.personAccount)

      if (!res.result) {
        this.errorMessage = res.errMsg
        document.title = 'Twitter Like'
        return
      }

      this.person = res.person
      this.isFollowing = res.isFollowing
      document.title = `${this.person.name} (@${this.person.account})`
    },
    windowScrollEventHandelr (e) {
      this.needPersonalWallFix = $(window).scrollTop() > 300
    }
  }
}
</script>

<style lang="css" scoped>
#PersonalHome {
  padding-top: 46px;
}

.PersonalWall {
  position: relative;
  height: 380px;
  z-index: 1;
}

.WallImgContainer {
    position: relative;
}

.BkgImgContainer {
  height: 320px;
  background-color: #dedede;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.ProfileImgContainer {
  position: relative;
  max-width: 890px;
  margin: 0 auto;
}

.ProfileImg {
  position: absolute;
  bottom: -87px;
  background: #fff;
  border: 5px solid #fff;
  border-radius: 50%;
  transition: 300ms;
  transform: translateY(0);
  overflow: hidden;
}

.ProfileImgContainer .ProfileImgLink {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: black;
  display: inline-block;
  position: relative;
}

.ProfileImgContainer img {
  position: relative;
  width: 100%;
}

.ProfileInfoContainer {
  height: 60px;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
  background-color: white;
}

.ProfileInfoWrapper {
  margin: 0 auto;
  max-width: 890px;
  height: 100%;
  display: flex;
  overflow: hidden;
}

.CardContainer {
  width: 33.33333%;
  display: flex;
  align-items: center;
  padding: 0 5px;
  transform: translateY(100%);
  transition: 300ms;
}

.CardContainer .ImgWrapper {
  width: 36px;
  height: 36px;
  margin-right: 10px;
  border-radius: 50%;
  overflow: hidden;
}

.CardContainer .ImgWrapper img {
  width: 100%;
}

.CardContainer .NameInfo {
  font-size: 18px;
  font-weight: bold;
}

.TabContainer {
  padding: 0 5px;
  display: flex;
}

.TabItem {
  display: block;
  height: 100%;
  position: relative;
}

.TabItem:after {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2px;
  opacity: 0;
  transition: 400ms;
  background-color: #0084B4;
}

.TabItem:hover:after,
.TabItem.active:after {
  opacity: 1;
}

.TabTxt {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  padding: 0 15px;
  text-align: center;
}

.TabTitle {
  color: #657786;
  font-weight: bold;
  font-size: 12px;
}

.Count {
  font-size: 18px;
  font-weight: bold;
}

.WallContent {
  background-color: #e6ecf0;
  min-height: 500px;
}

#PersonalHome[fix=true] {
  padding-top: 425px;
}

#PersonalHome[fix=true] .PersonalWall{
  position: fixed;
  width: 100%;
  top: -255px;
}

#PersonalHome[fix=true] .ProfileImg {
  transform: translateY(-100%);
}

#PersonalHome[fix=true] .CardContainer {
  transform: translateY(0);
}

.ContentContainer {
  max-width: 890px;
  margin: 0 auto;
  padding: 30px 0;
  display: flex;
}

.LeftSideContent {
  width: 33.333%;
  padding: 0 5px;
  display: none;
}

.RightSideContent {
  flex-grow: 1;
  padding: 0 5px;
  max-width: 66.66666%;
  margin: 0 auto;
}
</style>
