<template lang="html">
  <div class="PostsBox">
    <div class="PostsContainer">
      <PostItemComponent v-for="post in posts" :post="post" :detailPostRouteName="detailPostRouteName" :key="post._id"/>
      <div class="NonPost" v-if="!posts.length">
        <img src="/static/img/twitter-bird.png" alt="">
        <div class="txt">尚未有貼文</div>
      </div>
    </div>
  </div>
</template>

<script>
import PostItemComponent from '@/components/Post/PostItem'

export default {
  name: 'PostBox',
  components: {
    PostItemComponent
  },
  props: ['posts', 'detailPostRouteName']
}
</script>

<style lang="css" scoped>
.PostsBox {
    background-color: white;
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
