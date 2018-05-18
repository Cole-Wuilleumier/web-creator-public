<template>
  <div v-if="!(isLoggedIn)">
      <router-link class="nav-link" :to="{ path: '/login' }">Please Log in</router-link>
  </div>
  <div v-else>
      <div class="row" v-if="getUserProfiles">
        <div class="col-lg-4 col-md-6 col-sm-12 column" v-for="user of users" :key="user.userId" v-if="(user.userId != userId)">
          <div v-if="(user.userId != userId)">
            <div class="card">
              <img class="card-img-top" alt="">
              <div class="card-body">
                <h5 class="card-header">{{ user.name }}</h5>
                <b class="card-text">{{ user.memberSince }}</b>
                <p class="card-text">{{ user.headline }}</p>
                <router-link class="btn btn-primary" :to="{ path: '/others-profile/'+user.userId}">View {{ user.name }}'s Profile</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>

import { verifyToken } from '../../utils/auth/login';
import { getProfiles } from '../../utils/profile/profileService'

export default {
  name: 'ProfileUsers',
  data () {
    return {
        users:[],
        userId:'',
        error: false
    }
  },
  computed: {
    isLoggedIn(){
      verifyToken((state)=>{
          if(state){
            this.$store.commit('setLoginTrue');
            var currentUser = {
                id: localStorage.getItem('user-id'),
                name: localStorage.getItem('user-name'),
                email: localStorage.getItem('user-email'),
                memberSince: localStorage.getItem('user-memberSince')
            };
            this.userId = currentUser.id;
            this.$store.commit('setCurrentUser', currentUser);
          } else {
            this.$store.commit('setLoginFalse');
          }
      }); 
      return this.$store.state.isLoggedIn;
    },
    getUserProfiles(){
      getProfiles((profiles, state)=>{
        
        //Adjust the memberSince output to short version
        for(var i = 0; i < profiles.length; i++){
          if(profiles[i].memberSince != null){
            var memberSinceDate = new Date(profiles[i].memberSince);
            var month = memberSinceDate.getUTCMonth() + 1;
            var day = memberSinceDate.getUTCDate();
            var year = memberSinceDate.getUTCFullYear();
            memberSinceDate = month + '/' + day + '/' + year;
            profiles[i].memberSince = memberSinceDate;
          }
        }

        if(state){
          this.users = profiles;
          this.$store.commit("setProfilesRecieved");
        } else {
          this.$store.commit("setProfilesFailed");
        }
      });
      return this.$store.state.profilesRecieved;
    }
  },
  methods: {
  }
}
</script>

<style lang="css">
</style>