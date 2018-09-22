<template lang="html">
  <div class="UserSearchBarContainer">
    <input type="text" class="SearchInput" v-model.trim="searchText" placeholder="搜尋" @keyup.enter="search">
    <i class="fas fa-search search-btn" @click.stop="search"></i>
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      searchText: ''
    }
  },
  methods: {
    search() {
      if (!this.searchText) {
        return
      }

      let query = this.searchText.toString()
      this.searchText = ''
      this.$router.push({
        name: 'Search',
        params: {
          query
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
.UserSearchBarContainer {
  position: relative;
}

.SearchInput {
  width: 250px;
  outline: none!important;
  display: block;
  border-radius: 21px;
  border: 1px solid #e6ecf0;
  font-size: 12px;
  font-weight: 100;
  height: 32px;
  line-height: 16px;
  padding: 8px 32px 8px 12px;
  transition: all .2s ease-in-out;
  background-color: #f5f8fa;
}

.SearchInput:focus {
  border: 2px solid #1DA1F2;
  background-color: white;
}

.search-btn {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;
}
</style>
