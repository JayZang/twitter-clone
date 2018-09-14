<template lang="html">
  <div class="UserHomeContainer">
    <div class="LeftSideContainer">
      <div class="ProfileCardContainer">
        <div class="ProfileWallImg"></div>
        <div class="ProfileContentContainer">
          <img src="" class="ProfileUserImg">
          <div class="ProfileName">

          </div>
          <div class="ProfileAccount">

          </div>
          <div class="ProfileInfo">
            <div class="ProfilePosts">

            </div>
            <div class="ProfileFollowing">

            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="RightSideContainer">

    </div>
  </div>
</template>

<script>
export default {
  name: 'UserHome',
  data () {
    return {
      user: undefined,
    }
  },
  computed: {
    isResponsed: function () {
      return user !== undefined
    },
    hasUser: function () {
      return user !== undefined && user !== null
    }
  },
  watch: {

  },
  created () {

  },
  methods: {
    getUserInfo: async function () {
      // let res = await 
    }
  }
}
</script>

<style lang="css">
</style>
