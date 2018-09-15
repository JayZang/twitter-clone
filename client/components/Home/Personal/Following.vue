<template lang="html">
  <div id="FollowingList">
    <div class="ListContainer">
      <div class="List">
        <div class="ItemContainer" v-for="person in personList">
          <div class="Item">
            <div class="BkgWall" :style="`background-image: url(${person.bkgWallImg})`"></div>
            <div class="Content">
              <div class="ProfileImg">
                <img :src="person.profileImg" alt="">
              </div>
              <div class="Btn">
                <FollowBtn class="small" :userId="person.account" :following="!!person.isFollowing" />
              </div>
              <div class="ProfileInfo">
                <div class="Name">
                  <router-link :to="`/${person.account}`">
                    {{person.name}}
                  </router-link>
                </div>
                <div class="ID">
                  @{{person.account}}
                </div>
                <div class="Des">

                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="NonPerson" v-if="!personList.length">
          <div class="txt">尚未追蹤用戶</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import personInfo from '@/API/Person/info'
import FollowBtn from '@/components/Btns/Follow'

export default {
  name: 'PersonFollowingList',
  data () {
    return {
      personList: []
    }
  },
  components: {
    FollowBtn
  },
  created () {
    this.getPersonListInfo()
  },
  methods: {
    async getPersonListInfo () {
      let PersonAccount = this.$route.params.PersonAccount
      let res = await personInfo.GetPersonFollowingInfo(PersonAccount)

      if (!res.result) {
        console.log(res.errMsg)
        return
      }

      this.personList = res.following
    }
  }
}
</script>

<style lang="css" scoped>
#FollowingList {
  position: relative;
}

.List {
  display: flex;
}

.ItemContainer {
  width: 50%;
  padding: 0 5px;
  margin-bottom: 10px;
}

.Item {
  background-color: white;
}

.BkgWall {
  height: 90px;
  background-color: #dfdfdf;
  background-position: center;
  background-size: cover;
}

.Btn {
 display: flex;
 height: 33px;
}

.Content {
  padding: 13px 15px;
}

.ProfileImg {
  position: absolute;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: black;
  overflow: hidden;
  margin: -45px 2px 0 -3px;
  border: 3px solid white;
}

.ProfileImg img {
  position: relative;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.ProfileInfo {
    margin-top: 8px;
    letter-spacing: 0.03em;
}

.Name {
  font-size: 18px;
  font-weight: bold;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.ID {
  color: #66757f;
  font-size: 14px;
  font-weight: normal;
}

.Des {
  height: 125px;
}

.NonPerson {
  text-align: center;
  padding: 10px;
  font-size: 18px;
  color: #14171a;
  margin: 0 auto;
}
</style>
