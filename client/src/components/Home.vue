<template>
  <div>
    <div v-if="isLoggedIn">
      <div class="row"> 
        <div class="col col-lg-12">
          <div id="hero-background" class="jumbotron jumbotron-fluid">
            <h1 class="display-3">Hello, {{ name }}</h1>
            <p class="lead">Have you come to build more awesome websites?</p>
            <br>
            <p>Build websites and easily share them with your friends.</p>
            <p class="lead">
              <router-link class="btn btn-primary btn-lg" role="button" :to="{ path: '/me/'+userId }">View Your Profile</router-link>
            </p>
          </div>
        </div>
      </div>

    </div>
    <div v-else>
      <div class="row" id="authHomeBlock"> 
        <div class="col col-lg-6 col-md-6 col-sm-12">
          <login></login>
        </div>
        <div class="col col-lg-6 col-md-6 col-sm-12">
          <signup></signup>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import { verifyToken, logout } from '../utils/auth/login';
import Login from './Login'
import Signup from './Signup'


export default {
  name: 'Home',
  components:{
    'login':Login,
    'signup':Signup
  },
  computed: {
      name(){
        return this.$store.state.currentUser.name;
      },
      isLoggedIn(){
          verifyToken((state)=>{
              if(state){
                this.$store.commit('setLoginTrue');
                var currentUser = {
                    id: localStorage.getItem('user-id'),
                    name: localStorage.getItem('user-name'),
                    email: localStorage.getItem('user-email'),
                    memberSince: localStorage.getItem('user-memberSince'),

                };
                this.$store.commit('setCurrentUser', currentUser);
              } else {
                this.$store.commit('setLoginFalse');
              }
          }); 
          return this.$store.state.isLoggedIn;
      },
      userId(){
        return this.$store.state.currentUser.userId
      }
    },
  methods:{
      login(){
          this.$router.push({path:'/login'});
      },
      signup(){
          this.$router.push({path:'signup'});
      }
  }
}
</script>

<style lang="css">
#authHomeBlock{
  padding-top: 15vh;
  height: 80vh;
}

#hero-background{
  background: linear-gradient(rgba(0, 0, 0, 0.30), rgba(0, 0, 0, 0.30));
  background-repeat: no-repeat;
  background-size: cover;
  color:white;
}


</style>