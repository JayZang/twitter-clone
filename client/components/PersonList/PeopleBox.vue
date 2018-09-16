<template lang="html">
  <div class="PersonListContainer">
    <div class="List" v-if="personList">
      <PersonItem v-for="person in personList" :person="person" :style="`width: ${itemWidth}`" :key="person._id"/>
    </div>
  </div>
</template>

<script>
import PersonItem from './PersonItem'

export default {
  name: 'PeopleBox',
  props: ['personList', 'columnCount'],
  components: {
    PersonItem
  },
  computed: {
    itemWidth: function () {
      return Number(this.columnCount) ? (100 / this.columnCount + '%') : '50%'
    }
  }
}
</script>

<style lang="css" scoped>
.PersonListContainer {
  width: 100%;
}

.List {
  display: flex;
  flex-wrap: wrap;
}
</style>
