<template lang="html">
  <div class="SearchViewContainer">
    <div class="QueryTextContainer">
      <div class="QueryTextWrapper">{{query}}</div>
    </div>
    <div class="QueryTypesContainer">
      <div class="QueryTypesWrapper">
        <div class="TypesList">
          <div class="TypesItem active">
            人們
          </div>
        </div>
      </div>
    </div>
    <div class="SearchResultContainer">
      <LoadingAnimationComponent :class="{loadingAnimation: true, loaded: loaded}"/>
      <div class="SearchResultWrapper">
        <PeopleBox :personList="personList" columnCount="3"/>
      </div>
      <div class="NoData" v-if="loaded && !personList.length">
        無搜尋結果
      </div>
    </div>
  </div>
</template>

<script>
import PeopleBox from '@/components/PersonList/PeopleBox'
import LoadingAnimationComponent from '@/components/Animate/Loading'
import SearchAPI from '@/API/Search'

export default {
  name: 'SearchView',
  props: ['query'],
  components: {
    PeopleBox,
    LoadingAnimationComponent
  },
  data() {
    return {
      personList: [],
      loaded: false
    }
  },
  created() {
    this.searchUsers()
  },
  watch: {
    query: 'searchUsers'
  },
  methods: {
    async searchUsers() {
      this.loaded = false
      this.personList = []
      let res = await SearchAPI.searchUsers(this.query.trim())
      this.loaded = true

      if (!res.result) {
        console.log(res)
        return
      }

      this.personList = res.users
    }
  }
}
</script>

<style lang="css" scoped>
.SearchViewContainer {
  margin-top: 46px;
  height: calc(100vh - 46px);
  background-color: #e6ecf0;
}

.QueryTextContainer {
  background-color: #1da1f2;
  padding: 16px 0;
}

.QueryTextWrapper {
  margin: 0 auto;
  max-width: 890px;
  color: #fff;
  font-size: 27px;
  font-weight: bold;
  line-height: 32px;
  overflow: hidden;
  padding-left: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.QueryTypesContainer {
  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.25);
}

.QueryTypesWrapper {
  margin: 0 auto;
  max-width: 890px;
}

.TypesList {
  display: flex;
}

.TypesItem {
  color: #657786;
  display: block;
  font-weight: bold;
  padding: 16px;
  font-size: 14px;
  cursor: pointer;
  position: relative;
}

.TypesItem:after {
  content: '';
  width: 100%;
  height: 2px;
  position: absolute;
  background-color: #1DA1F2;
  left: 0;
  bottom: 0;
  opacity: 0;
  transition: 300ms;
}

.TypesItem:hover,
.TypesItem.active {
  color: #1DA1F2 !important;
}

.TypesItem:hover:after,
.TypesItem.active:after {
  opacity: 1;
}

.SearchResultContainer {
  margin-top: 15px;
}

.SearchResultWrapper {
  max-width: 890px;
  margin: 0 auto;
}

.NoData {
  text-align: center;
}

.loadingAnimation {
  height: 100px;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.loadingAnimation.loaded {
  height: 0;
  transition: 1s;
}
</style>
