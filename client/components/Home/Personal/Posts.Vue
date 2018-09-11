<template lang="html">
  <div id="PersonalPost">
    <div class="HeadContainer">
      <div class="Content">
        <div class="Txt">
          推文
        </div>
      </div>
    </div>
    <div class="PostsContainer">
      <div id="PostTemplate" v-if="!isResponsed">
        <div class="Post">
          <div class="LeftSide">
            <div class="ProfileImg">
              <img src="" alt="">
            </div>
          </div>
          <div class="RightSide">
            <div class="Info">
              <div class="Name"></div>
              <div class="UserId">
                @<span class="id"></span>
              </div>
              <div class="Date"></div>
            </div>
            <div class="Content"></div>
            <div class="OperationBtns">
              <div class="ReplyBtn Btn">
                <i class="far fa-comment"></i>
                <span class="Count">7</span>
              </div>
              <div class="LikeBtn Btn">
                <i class="far fa-heart"></i>
                <span class="Count">77</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Post" v-for="post in posts">
        <div class="LeftSide">
          <div class="ProfileImg">
            <img :src="personImg" alt="">
          </div>
        </div>
        <div class="RightSide">
          <div class="Info">
            <div class="Name">{{personName}}</div>
            <div class="UserId">
              @<span class="id">{{personAccount}}</span>
            </div>
            <div class="Date">{{RegPostDate(post.created)}}</div>
          </div>
          <div class="Content">{{post.content}}</div>
          <div class="OperationBtns">
            <div class="ReplyBtn Btn">
              <i class="far fa-comment"></i>
              <span class="Count">7</span>
            </div>
            <div class="LikeBtn Btn">
              <i class="far fa-heart"></i>
              <span class="Count">{{post.likes.length}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

import postAPI from '@/API/Person/info'

export default {
  name: 'PersonalPost',
  props:['personID'],
  data () {
    return {
      person: null,
      isResponsed: false
    }
  },
  computed: {
    posts: function () {
      return !!this.person ? this.person.posts : []
    },
    personName: function () {
      return !!this.person ? this.person.name : ''
    },
    personAccount: function () {
      return !!this.person ? this.person.account : ''
    },
    personImg: function () {
      return this.person ? this.person.profileImg : ''
    },
    RegPostDate: function () {
      return date => moment(date).format('YYYY年M月D日')
    }
  },
  created () {
    this.getPersonPosts()
  },
  watch: {
    'personID': function () {
      this.getPersonPosts()
    }
  },
  methods: {
    async getPersonPosts () {
      if (!this.personID)
        return

      let res = await postAPI.GetPersonPosts(this.personID, this.$store.getters.authToken);
      this.isResponsed = true

      if (!res.result) {
        return
      }

      this.person = res.person
    }
  }
}
</script>

<style lang="css" scoped>
#PersonalPost {
    background-color: white;
}

.HeadContainer {
  padding: 0 12px;
  background-color: #fff;
  border: 1px solid #e6ecf0;
  position: relative;
}

.HeadContainer .Content {
  display: flex;
}

.HeadContainer .Txt{
  font-size: 18px;
  font-weight: bold;
  line-height: 1;
  padding: 15px 15px 12px;
}

#PostTemplate .Post {
}

#PostTemplate .Post .ProfileImg {
  background-color: rgba(222, 222, 222, 0.3);
}

#PostTemplate .Post .Info {
  background-color: rgba(222, 222, 222, .2);
  border-radius: 30px;
  height: 22px;
}

#PostTemplate .Post .Info > * {
  display: none;
}

#PostTemplate .Post .Content {
  background-color: rgba(222, 222, 222, .2);
  min-height: 150px;
  margin-top: 10px;
  border-radius: 10px;
}

#PostTemplate .OperationBtns {
  display: none;
}

#PostTemplate .Post:hover {
  background-color: inherit;
  cursor: auto;
}

.Post {
  padding: 9px 12px;
  min-height: 51px;
  border-bottom: 1px solid #e6ecf0;
  cursor: pointer;
  display: flex;
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

.Post .ReplyBtn:hover {
  color: #1da1f2;
}

.Post .LikeBtn:hover {
  color: #e0245e;
}
</style>
