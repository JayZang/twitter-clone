<template lang="html">
  <div id="PersonalHome" :fix="needPersonalWallFix">
    <div class="PersonalWall">
      <div class="WallImgContainer">
        <div class="BkgImgContainer">

        </div>
        <div class="ProfileImgContainer">
          <div class="ProfileImg">
            <a href="#" class="ProfileImgLink">
              <img src="" alt="">
            </a>
          </div>
        </div>
      </div>
      <div class="ProfileInfoContainer">
        <div class="ProfileInfoWrapper">
          <div class="CardContainer">
            <div class="ImgWrapper">
              <a href="#">
                <img src="" alt="">
              </a>
            </div>
            <div class="NameInfo">
              <span>Jay</span>
            </div>
          </div>
          <div class="TabContainer">
            <router-link :to="`/${userId}/posts`" class="TabItem active">
              <div class="TabTxt">
                <div class="TabTitle">推文</div>
                <div class="Count">12345</div>
              </div>
            </router-link>
            <router-link :to="`/${userId}/posts`" class="TabItem">
              <div class="TabTxt">
                <div class="TabTitle">正在跟隨</div>
                <div class="Count">12345</div>
              </div>
            </router-link>
            <router-link :to="`/${userId}/posts`" class="TabItem">
              <div class="TabTxt">
                <div class="TabTitle">跟隨者</div>
                <div class="Count">12345</div>
              </div>
            </router-link>
            <router-link :to="`/${userId}/posts`" class="TabItem">
              <div class="TabTxt">
                <div class="TabTitle">喜歡的內容</div>
                <div class="Count">12345</div>
              </div>
            </router-link>
          </div>
          <div class="FollowBtnContainer">
            <button href="#" class="FollowBtn">追蹤</button>
          </div>
        </div>
      </div>
    </div>
    <div class="WallContent">
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonalHome',
  data () {
    return {
      userId: null,
      needPersonalWallFix: false
    }
  },
  created () {
    this.userId = this.$route.params.UserId
    window.addEventListener('scroll', this.windowScrollEventHandelr)
  },
  methods: {
    windowScrollEventHandelr (e) {
      console.log($(window).scrollTop())
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

.FollowBtn:hover {
    background-color: #E5F2F7;
}

.WallContent {
  background-color: #e6ecf0;
  height: 1600px;
}

#PersonalHome[fix=true] {
  padding-top: 380px;
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
</style>
