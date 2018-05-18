<template>
  <div v-if="!(isLoggedIn)">
      <router-link class="nav-link" :to="{ path: '/login' }">Please Log in</router-link>
  </div>
  <div class="row" v-else>
    <div class="col-lg-11 col-md-11 col-sm-12 col text-left" v-if="hasProfile"> 
      <!--Display user's profile-->
      <div class="row">
        <div class="col-lg-5 col-md-5 col-sm-12 col">
          <h1>{{ profile.name }}</h1>
          <p class="text-center"><img class="img-rounded img-thumbnail" v-bind:src="profile.profileImage" /></p>
          <p>Member Since: {{ profile.memberSince }}</p>
        </div>
        <div class="col-lg-7 col-md-7 col-sm-12 col">
          <h4>"{{ profile.headline }}"</h4><br /> 
          <h3>Job Title: </h3> 
          <p>{{ profile.jobTitle }}</p>
          <h3>About Me:</h3>
          <p>{{ profile.aboutMe }}</p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col">
          <div class="card">
            <h3>{{profile.name}}'s Webpages</h3>
            <webpages></webpages>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { verifyToken } from '../../utils/auth/login';
import { getProfile} from '../../utils/profile/profileService';

import  WebpageCollection from '../WebpageComponents/WebpageCollection';


export default {
  name: 'ProfileOther',
  components:{
    'webpages': WebpageCollection
  },
  data () {
    return {
        profile:'',
        deleteConfirmation: false,
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
            this.$store.commit('setCurrentUser', currentUser);
          } else {
            this.$store.commit('setLoginFalse');
          }
      }); 
      this.userId = this.$route.params.id;
      return this.$store.state.isLoggedIn;
    },
    hasProfile(){ 
      getProfile(this.userId, (state, profile)=>{
        if(state) {
          //Grab the date for member since
          var memberSinceDate = new Date(profile.memberSince);
          var month = memberSinceDate.getUTCMonth() + 1;
          var day = memberSinceDate.getUTCDate();
          var year = memberSinceDate.getUTCFullYear();
          memberSinceDate = month + '/' + day + '/' + year;

          this.profile = profile;

          if(profile.profileImage != null || profile.profileImage != ''){
            this.profile.profileImage = profile.profileImage;
          }

          this.profile.memberSince = memberSinceDate;
          this.$store.commit('setProfileConditionTrue');
        } else {
          this.$store.commit('setProfileConditionFalse');
        }
      });
      return this.$store.state.profileCondition;
    }
  },
  methods: {
  }
}
</script>

<style lang="css">
.editSuccessFade {
  animation-duration: 1.2s;
  animation-name: fadeOut;
}

.hidden{
  opacity: 0;
}


</style>