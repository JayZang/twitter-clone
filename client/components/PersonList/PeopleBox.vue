<template lang="html">
  <div class="PersonListContainer">
    <div class="List" v-if="personList">
      <PersonItem v-for="person in personList" :person="person" :key="person._id"/>
    </div>
  </div>
</template>

<script>
import PersonItem from './PersonItem'

export default {
  name: 'PeopleBox',
  props: ['personList'],
  components: {
    PersonItem
  }
}
</script>

<style lang="css" scoped>
.PersonListContainer {
  width: 100%;
}

.List {
  display: flex;
}
</style>
