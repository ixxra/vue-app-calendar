<template>
    <div id="app">
        <div><img src="./assets/logo.png"></div>
        <router-link :to="{name: 'Home'}">Home</router-link>
        /
        <router-link :to="{name: 'Calendar'}">Calendar</router-link>
        /
        <router-link :to="{name: 'About'}">About</router-link>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
 @import "./custom-style.scss"; 
 @import "../node_modules/bootstrap/scss/bootstrap.scss";
 #app {
     font-family: 'Avenir', Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     text-align: center;
     color: #2c3e50;
     margin-top: 60px;
 }
</style>
