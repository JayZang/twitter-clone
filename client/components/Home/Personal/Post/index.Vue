<template lang="html">
  <div id="PersonalPost">
    <div class="HeadContainer">
      <div class="Content">
        <div class="Txt">
          推文
        </div>
      </div>
    </div>
    <PostCreaterComponent class="" v-if="isLoginedUser" @newPost="newPostEventHandler"/>
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
              </div>
              <div class="Date"></div>
            </div>
            <div class="Content"></div>
          </div>
        </div>
      </div>
      <PostItemComponent v-for="post in posts" :post="post" :person="person"/>
      <div class="NonPost" v-if="!posts.length">
        <img src="/static/img/twitter-bird.png" alt="">
        <div class="txt">尚未發送個人貼文</div>
      </div>
    </div>
  </div>
</template>

<script>
import PostItemComponent from './PostItem'
import PostCreaterComponent from './PostCreater'
import personAPI from '@/API/Person/info'

export default {
  name: 'PersonalPost',
  components: {
    PostCreaterComponent,
    PostItemComponent
  },
  data () {
    return {
      person: null,
      isResponsed: false
    }
  },
  computed: {
    posts: {
      get: function () {
        return !!this.person ? this.person.posts : []
      },
      set: function (newPost) {
        this.person.posts.unshift(newPost)
      }
    },
    isLoginedUser: function () {
      return !!this.person ? this.person.account === this.$store.getters.userAccount : false
    }
  },
  created () {
    this.getPersonPosts()
  },
  watch: {
    '$route.params.PersonAccount': function () {
      this.getPersonPosts()
    }
  },
  methods: {
    async getPersonPosts () {
      let personAccount = this.$route.params.PersonAccount
      let res = await personAPI.GetPersonPosts(personAccount);
      this.isResponsed = true

      if (!res.result) {
        console.log(res)
        return
      }

      this.person = res.person
      document.title = `${this.person.name} (@${this.person.account}) | Twitter`
    },
    newPostEventHandler (newpost) {
      this.posts = newpost
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

#PostTemplate .Post .ProfileImg {
  background-color: rgba(222, 222, 222, 0.3);
}

#PostTemplate .Post .Info {
  background-color: rgba(222, 222, 222, .2);
  border-radius: 30px;
  height: 22px;
}

#PostTemplate .Post .Content {
  background-color: rgba(222, 222, 222, .2);
  min-height: 150px;
  margin-top: 10px;
  border-radius: 10px;
}

.Post {
  padding: 9px 12px;
  min-height: 51px;
  border-bottom: 1px solid #e6ecf0;
  display: flex;
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

.NonPost {
  text-align: center;
  padding: 10px;
  font-size: 13px;
  color: #14171a;
}

.NonPost img {
  width: 30px;
  margin-bottom: 5px;
}
</style>
