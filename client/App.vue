<template>
  <div id="app">
    <router-view name="TopNavBar"/>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

a {
  color: #1c94e0;
  text-decoration: none;
}

a:hover {
  color: #0084B4;
  text-decoration: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;  
  margin: 0;
  color: #2c3e50;
}
</style>
