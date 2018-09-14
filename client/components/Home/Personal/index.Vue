<template lang="html">
  <div id="PersonalPost">
    <div class="HeadContainer">
      <div class="Content">
        <div class="Txt">
          推文
        </div>
      </div>
    </div>
    <PostCreaterComponent v-if="isLoginedUser" @newPost="newPostEventHandler"/>
    <PostsBoxComponent :posts="posts"/>
  </div>
</template>

<script>
import PostsBoxComponent from '@/components/Post/PostsBox'
import PostCreaterComponent from '@/components/Post/PostCreater'
import personAPI from '@/API/Person/info'

export default {
  name: 'PersonalDefault',
  components: {
    PostCreaterComponent,
    PostsBoxComponent
  },
  data () {
    return {
      posts: [],
      isResponsed: false
    }
  },
  computed: {
    isLoginedUser () {
      return this.$route.params.PersonAccount === this.$store.getters.userAccount
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

      this.posts = res.posts
    },
    newPostEventHandler (newpost) {
      this.posts.unshift(newpost)
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
</style>
