<template>
<div>
  <div v-if="!isLoggedIn">

    <nav class="navbar navbar-light">
        <router-link class="nav-link" :to="{ path: '/' }">WebCreator</router-link>
        <ul class="nav nav-list">
          <li class="nav-item"><router-link class="nav-link" :to="{ path: '/signup' }">Sign Up</router-link></li>
          <li class="nav-item"><router-link class="nav-link" :to="{ path: '/login' }">Login</router-link></li>
           <li class="nav-item"><button type="button" class="btn btn-light" v-on:click="help" >Help</button></li>
        </ul>
    </nav>

  </div>
  <div v-else>
    <nav class="navbar navbar-expand-lg navbar-light">
        <router-link class="nav-link" :to="{ path: '/' }">WebCreator</router-link>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item"><router-link class="nav-link" :to="{ path: '/user-profiles' }">Find Users</router-link></li>
            <li class="nav-item"><router-link class="nav-link" :to="{ path: '/me/'+userId }">Your Profile</router-link></li>
            <li class="nav-item"><router-link class="nav-link" :to="{ path: '/create-webpage' }">Create New Webpage</router-link></li>
          </ul>
          <ul class="navbar-nav nav-pills ml-auto">
            <li class="nav-item"><button type="button" class="btn btn-light" v-on:click="help" >Help</button></li>
            <li class="nav-item"><button type="button" class="btn btn-light" v-on:click="logout" >Log out</button></li>
          </ul>
      </div>
    </nav>

  </div>
</div>
</template>

<script>

import { verifyToken, logout } from '../utils/auth/login';

export default {
  name: 'Nav',
  computed: {
      name(){
          return this.$store.state.currentUser.name;
      },
      isLoggedIn(){
          return this.$store.state.isLoggedIn;
      },
      userId(){
        return this.$store.state.currentUser.userId
      }

    },
  methods:{
      logout(){
        logout(()=>{
          this.$store.commit('setLoginFalse');
        });
      },
      login(){
          this.$router.push({path:'/login'});
      },
      signup(){
          this.$router.push({path:'/signup'});
      },
      help(){
        this.$router.push({path:'/help'});
      }
  }
}
</script>

<style lang="css">

</style>