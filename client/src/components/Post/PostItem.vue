<template lang="html">
  <router-link class="Post" :to="{name: postRouteName, params: {PersonAccount: post.author.account, PostID: post._id}}" tag="div">
    <div class="LeftSide">
      <div class="ProfileImg">
        <img :src="post.author.profileImg" alt="">
      </div>
    </div>
    <div class="RightSide">
      <div class="Info">
        <div class="Name">{{post.author.name}}</div>
        <div class="UserId">
          @<span class="id">{{post.author.account}}</span>
        </div>
        <div class="Date">{{RegPostDate(post.created)}}</div>
      </div>
      <div class="Content" v-html="post.content"></div>
      <div class="OperationBtns">
        <div class="ReplyBtn Btn">
          <span class="BtnWrapper" @click.stop="openReplyBox">
            <i class="far fa-comment"></i>
            <span class="Count">{{commentsCount}}</span>
          </span>
        </div>
        <div class="LikeBtn Btn" :isLiked="isLiked">
          <span class="BtnWrapper" @click.stop="toggleLike(post._id)">
            <i class="fas fa-heart" v-if="isLiked"></i>
            <i class="far fa-heart" v-if="!isLiked"></i>
            <span class="Count">{{likesCount}}</span>
          </span>
        </div>
      </div>
    </div>
    <PostCommentBoxComponent v-if="showReplyBox" @Close="showReplyBox = false" @ReplySuccess="replySuccessEventHandler" :postID="post._id">
      <template slot="Title">{{post.author.name}}</template>
      <template slot="ProfileImg">
        <img :src="post.author.profileImg" alt="">
      </template>
      <template slot="Name">{{post.author.name}}</template>
      <template slot="Account">{{post.author.account}}</template>
      <template slot="Date">{{RegPostDate(post.created)}}</template>
      <template slot="PostContent" >
        <div v-html="post.content"></div>
      </template>
    </PostCommentBoxComponent>
  </router-link>
</template>

<script>
import moment from 'moment'

import PostCommentBoxComponent from './CommentBox'
import postAPI from '@/API/Post'

export default {
  name: 'PostItem',
  props: ['post', 'detailPostRouteName'],
  components: {
    PostCommentBoxComponent
  },
  data () {
    return {
      likes: [],
      comments: [],
      showReplyBox: false
    }
  },
  computed: {
    postRouteName: function () {
      return !!this.detailPostRouteName ? this.detailPostRouteName : 'PersonDetailPostInfo'
    },
    RegPostDate: function () {
      return date => moment(date).format('YYYY年M月D日')
    },
    likesCount: function () {
      return this.likes.length
    },
    isLiked: function () {
      return this.likes.includes(this.$store.getters.userID)
    },
    commentsCount: function () {
      return this.comments.length
    }
  },
  created() {
    this.likes = this.post.likes
    this.comments = this.post.comments
  },
  watch: {
    post: function () {
      this.likes = this.post.likes
      this.comments = this.post.comments
    }
  },
  methods: {
    async toggleLike(postID) {
      let res = await postAPI.ToggleLike(postID)

      if (res.result) {
        this.likes = res.likes
      }
    },
    openReplyBox() {
      if (!this.$store.getters.isLogin) {
        return this.$router.push({
          name: 'login'
        })
      }

      this.showReplyBox = true
    },
    replySuccessEventHandler(comments) {
      this.comments = comments
    }
  }
}
</script>

<style lang="css" scoped>
.Post {
  padding: 9px 12px;
  min-height: 51px;
  border-bottom: 1px solid #e6ecf0;
  cursor: pointer;
  display: flex;
  background-color: white;
}

.Post:hover {
  background-color: #f5f8fa;
}

.Post .LeftSide {
  width: 48px;
  margin-right: 10px;
  flex-shrink: 0;
}

.Post .ProfileImg {
  width: 100%;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
}

.Post .ProfileImg img {
  width: 100%;
}

.Post .RightSide {
  flex-grow: 1;
}

.Post .Info {
  display: flex;
}

.Post .Info .Name {
  word-break: break-all;
  font-size: 14px;
  font-weight: bold;
}

.Post .Info .UserId,
.Post .Info .Date {
  font-size: 14px;
  color: #657786;
  margin: 0 5px;
}

.Post .Content {
  font-size: 14px;
  line-height: 20px;
}

.Post .OperationBtns {
  display: flex;
  margin: 10px 0 2px;
}

.Post .OperationBtns .Btn {
  min-width: 60px;
  font-size: 16px;
  display: flex;
}

.Post .OperationBtns .Count {
  font-size: 12px;
  margin-left: 5px;
  font-weight: bold;
  line-height: 1.35;
}

.Post .BtnWrapper {
  display: flex;
}

.Post .ReplyBtn:hover {
  color: #1da1f2;
}

.Post .LikeBtn:hover,
.Post .LikeBtn[isLiked=true]{
  color: #e0245e;
}
</style>
