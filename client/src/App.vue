<template>
  <div id="app">
    <div class="container-fluid">
      <nav-bar></nav-bar>
      <router-view/>
    </div>
  </div>
</template>

<script>

import Nav from './components/Nav'

export default {
  name: 'App',
  components:{
    'nav-bar': Nav
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
