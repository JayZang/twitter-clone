<template lang="html">
  <div id="FollowingList">
    <LoadingAnimationComponent v-if="!loaded"/>
    <div class="ListContainer">
      <PeopleBox :personList="personList"/>
    </div>
    <div class="NonPerson" v-if="!personList.length">
      <div class="txt">尚無追蹤者</div>
    </div>
  </div>
</template>

<script>
import personInfo from '@/API/Person/info'
import PeopleBox from '@/components/PersonList/PeopleBox'
import LoadingAnimationComponent from '@/components/Animate/Loading'

export default {
  name: 'PersonFollowingList',
  components: {
    PeopleBox,
    LoadingAnimationComponent
  },
  data () {
    return {
      personList: [],
      loaded: false
    }
  },
  created () {
    this.getPersonListInfo()
  },
  watch: {
    '$route.params.PersonAccount': 'getPersonListInfo'
  },
  methods: {
    async getPersonListInfo () {
      this.loaded = false
      this.personList = []
      let PersonAccount = this.$route.params.PersonAccount
      let res = await personInfo.GetPersonFollowerInfo(PersonAccount)
      this.loaded = true

      if (!res.result) {
        console.log(res.errMsg)
        return
      }

      this.personList = res.follower
    }
  }
}
</script>

<style lang="css" scoped>
#FollowingList {
  position: relative;
}

.NonPerson {
  text-align: center;
  padding: 10px;
  font-size: 18px;
  color: #14171a;
  margin: 0 auto;
}
</style>
