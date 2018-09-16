<template lang="html">
  <div class="DetailPostInfoContainer" @click.stop="">
    <div @click.stop="closeEvent" class="CloseBtn">╳</div>
    <div class="DetailPostInfoBox" v-if="Post">
      <div class="PersonBox">
        <div class="LeftSide">
          <div class="ProfileImg">
            <img :src="Post.author.profileImg" alt="">
          </div>
        </div>
        <div class="RightSide">
          <div class="Info">
            <div class="Name">
              {{Post.author.name}}
            </div>
            <div class="UserId">
              @<span class="id">{{Post.author.account}}
              </span>
            </div>
          </div>
        </div>
        <FollowBtnComponent :userId="Post.author.account" :following="Post.author.isFollowing"/>
      </div>
      <div class="PostContentBox" v-html="Post.content"></div>
      <div class="PostDate">
        {{RegPostDate(Post.created)}}
      </div>
      <div class="Status">
        <div class="CommentCount">
          <span><span class="count">{{Post.comments.length}}</span> 個回覆</span>
        </div>
        <div class="LikeCount">
          <span><span class="count">{{Post.likes.length}}</span> 個喜歡</span>
        </div>
        <div class="LikePersonImg">
          <router-link class="LikeUserLink" :to="`/${person.account}`" v-for="(person, index) in Post.likes" v-if="index < 10" :key="person._id">
            <img :src="person.profileImg" :title="person.name">
          </router-link>
        </div>
      </div>
      <div class="BoxReplyContainer" v-if="loginedUser">
        <img class="UserProfileImg" :src="loginedUser.profileImg">
        <div class="EditerContainer">
          <div class="Editer" default-txt="推你的回覆" contenteditable @focus="editerFocusEventHandler" @blur="editerBlurEventHandler" @input="editerInputEventHandler"></div>
          <button type="button" class="btn ReplyBtn" v-if="isEditerFocused" :disabled="!inputContent.length" @mousedown="replyBtnClickEventHandler">回覆</button>
        </div>
      </div>
      <div class="CommentsContainer">
        <div class="CommentItem" v-for="comment in Post.comments" :key="comment._id">
          <div class="CommentImgWrapper">
            <img :src="comment.user.profileImg" class="CommentPersonImg">
          </div>
          <div class="CommentInfoWrapper">
            <div class="CommentBasicInfo">
              <div class="CommentPersonName">
                <span>{{comment.user.name}}</span>
              </div>
              <div class="CommentPersonAccount">
                <span>@{{comment.user.account}}</span>
              </div>
              <div class="CommentDate">
                <span>{{RegCommentDate(comment.created)}}</span>
              </div>
            </div>
            <div class="CommentContent" v-html="comment.content"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import postAPI from '@/API/Post'
import commentAPI from '@/API/Comment'
import FollowBtnComponent from '@/components/Btns/Follow'

export default {
  name: 'DetailPostInfo',
  components: {
    FollowBtnComponent
  },
  props: ['backRoute'],
  data () {
    return {
      personAccount: this.$route.params.PersonAccount,
      postID: this.$route.params.PostID,
      Post: null,
      inputContent: '',
      contentEl: null,
      isEditerFocused: false
    }
  },
  computed: {
    routeWhenClosing: function () {
      return this.backRoute ? this.backRoute : {name: 'PersonPosts', params: {PersonAccount: this.personAccount}}
    },
    RegPostDate: function () {
      moment.updateLocale('zh-cn', {
        meridiem : function (hour, minute, isLowercase) {
          if (hour < 9) {
            return "早上";
          } else if (hour < 11 && minute < 30) {
            return "上午";
          } else if (hour < 13 && minute < 30) {
            return "中午";
          } else if (hour < 18) {
            return "下午";
          } else {
            return "晚上";
          }
        }
      });

      return date => moment(date).format('a h:m - YYYY年M月D日')
    },
    RegCommentDate() {
      return date => moment(date).format('YYYY年M月D日')
    },
    loginedUser: function () {
      return this.$store.state.Auth.user || null
    }
  },
  created () {
    this.GetPostInfo()
    $('body').css({
      height: '100vh',
      'overflow-y': 'hidden'
    })
  },
  destroyed () {
    $('body').css({
      height: '',
      'overflow-y': ''
    })
  },
  methods: {
    async GetPostInfo() {
      let res = await postAPI.GetDetailPostInfo(this.postID)

      if (!res.result) {
        console.log(res)
        return
      }

      this.Post = res.post
    },
    closeEvent(e) {
      this.$router.push(this.routeWhenClosing)
      // {name: 'PersonPosts', params: {PersonAccount: personAccount}}
    },
    editerFocusEventHandler(e) {
      this.contentEl = e.target
      this.isEditerFocused = true
    },
    editerBlurEventHandler(e) {
      this.isEditerFocused = false
      e.target.innerText = e.target.innerText.trim()
    },
    editerInputEventHandler(e) {
      this.inputContent = e.target.innerText.trim()
    },
    async replyBtnClickEventHandler() {
      let reg = new RegExp("\n","g");
      let res = await commentAPI.SendCommentToPost(this.postID, {
          content: this.inputContent.replace(reg, '<br>')
        })

      if (!res.result) {
        console.log(res)
        return
      }

      this.contentEl.innerHTML = ''
      this.Post.comments = res.comments
    }
  }
}
</script>

<style lang="css" scoped>
.DetailPostInfoContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.8);
  cursor: auto;
}

.CloseBtn {
    color: white;
    position: absolute;
    font-size: 22px;
    margin: 20px 20px 0 0;
    right: 0;
    cursor: pointer;
}

.DetailPostInfoBox {
  position: relative;
  max-width: 590px;
  margin: 0 auto;
  background-color: white;
  top: 10%;
  border-radius: 6px;
  min-height: 600px;
  padding:  30px 0;
  margin-bottom: 50px;
}

.PersonBox {
  display: flex;
  margin-bottom: 15px;
  padding: 0 40px;
}

.PostContentBox,
.Status,
.PostDate {
  padding: 0 40px;
}

.LeftSide {
  width: 48px;
  margin-right: 10px;
  flex-shrink: 0;
}

.ProfileImg {
  width: 100%;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
}

.ProfileImg img {
  width: 100%;
}

.Info {
  display: flex;
  flex-direction: column;
}

.Info .Name {
  word-break: break-all;
  font-size: 14px;
  font-weight: bold;
}

.Info .UserId {
  font-size: 14px;
  color: #657786;
}

.PostDate {
  font-size: 14px;
  color: #657786;
  line-height: 24px;
  margin-top: 10px;
}

.Status {
  margin-top: 10px;
  border-bottom: 1px solid #e6ecf0;
  border-top: 1px solid #e6ecf0;
  overflow: hidden;
  display: flex;
  font-size: 14px;
  color: #657786;
  line-height: 24px;
  height: 48px;
  align-items: center;
}

.count {
  font-weight: bold;
  color: black;
}

.LikeCount {
  margin-left: 10px;
}

.LikePersonImg {
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 10px;
  border-left: 1px solid #e6ecf0;
}

.LikeUserLink {
  margin-left: 10px;
}

.LikePersonImg img {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
}

.BoxReplyContainer {
  display: flex;
  background: rgba(0,132,180,0.1);
  padding: 8px 12px;
}

.UserProfileImg {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 8px;
}

.EditerContainer {
  position: relative;
  line-height: 20px;
  flex-grow: 1;
  width: calc(100% - 65px);
}

.Editer {
  position: relative;
  width: 100%;
  color: #1DA1F2;
  background: #fff;
  border: 1px solid #C6E7FB;
  border-radius: 8px;
  padding: 8px;
  word-wrap: normal;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 14px;
  letter-spacing: 0.03em;
  max-height: 38px;
  cursor: text;
}

.Editer:focus {
  outline: none;
  height: 100px;
  max-height: none;
  word-wrap: break-word;
  overflow-y: scroll;
  white-space: normal;
}

.Editer:empty:before {
  content: attr(default-txt);
  display: block;
  color: #aab8c2;
  position: relative;
}

.ReplyBtn {
  margin: 5px 3px 0 auto;
  border: 1px solid #1da1f2;
  color: #fff;
  background-color: #4AB3F4;
  padding: 2px 12px;
  font-size: 14px;
  border-radius: 100px;
  display: block;
}

.CommentsContainer {
  padding: 0 40px;
  margin-top: 10px;
}

.CommentItem {
  display: flex;
  padding: 15px 0px;
}

.CommentImgWrapper {
  margin-right: 10px;
}

.CommentPersonImg {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
}

.CommentBasicInfo {
  display: flex;
}

.CommentPersonName {
  word-break: break-all;
  font-size: 14px;
  font-weight: bold;
}

.CommentPersonAccount {
  font-size: 14px;
  color: #657786;
  margin-left: 4px;
}

.CommentDate {
  font-size: 12px;
  line-height: 22px;
  color: #657786;
  margin-left: 10px;
}

.CommentInfoWrapper {
  flex-grow: 1;
  word-break: break-all;
}

.CommentContent {
  font-size: 14px;
}
</style>
