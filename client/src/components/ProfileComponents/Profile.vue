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
          <h4>"{{ profile.headLine }}"</h4><br /> 
          <h3>Job Title: </h3>
          <p>{{ profile.jobTitle }}</p>
          <h3>About Me:</h3>
          <p>{{ profile.aboutMe }}</p>
        </div> 
      </div>
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col">
          <div class="card">
            <h3>{{profile.name}}'s Webpages:</h3>
            <webpages></webpages>
          </div>
        </div>
      </div>
      

      <!--Displays Delete/Edit Buttons-->
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12 col text-center">
          <div v-if="!(deleteConfirmation)">
            <p v-if="error" class="alert alert-danger">Something went wrong when trying to delete this profile.</p>
            <button class="btn btn-primary" v-on:click="revealConfirmation()">Delete Profile</button>
            <router-link class="btn btn-primary" :to="{ path: '/profile-edit' }">Edit Profile</router-link><br>
            <span class="alert alert-success editSuccessFade hidden" v-if="editSuccess"> Profile updated successfully.</span>
          </div>
          <div v-else>
            <button class="btn btn-danger" v-on:click="confirmDelete()" >Confirm Deletion</button>
            <button class="btn btn-success" v-on:click="undoDelete()" >Don't Delete</button>
          </div>
        </div>
      </div>

    </div>
    <div class="col-lg-12 col-md-12 col text-center" v-else>
        <!--Create Profile-->
        <router-link class="nav-link" :to="{ path: '/profile-create' }">Create A Profile</router-link>
    </div>
  </div>
</template>

<script>

import { verifyToken } from '../../utils/auth/login';
import { getProfile, deleteProfile } from '../../utils/profile/profileService';

import WebpagesCollection from '../WebpageComponents/WebpageCollection';

export default {
  name: 'Profile',
  components:{
    'webpages':WebpagesCollection
  },
  data () {
    return {
        profile: '',
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
      return this.$store.state.isLoggedIn;
    },
    hasProfile(){ 
      this.userId = this.$store.state.currentUser.userId;
      getProfile(this.userId, (state, profile)=>{
        if(state) {
          this.profile = {
            userId: this.userId,
            profileId: profile._id,
            name: profile.name,
            headLine: profile.headline,
            jobTitle: profile.jobTitle,
            aboutMe: profile.aboutMe
          }

          if(profile.profileImage != null || profile.profileImage != ''){
            this.profile.profileImage = profile.profileImage;
          }

          //Grab the date for member since
          var memberSinceDate = new Date(profile.memberSince);
          var month = memberSinceDate.getUTCMonth() + 1;
          var day = memberSinceDate.getUTCDate();
          var year = memberSinceDate.getUTCFullYear();
          this.profile.memberSince = month + '/' + day + '/' + year;
          
          this.$store.commit('setProfileConditionTrue');
        } else {
          this.$store.commit('setProfileConditionFalse');
        }
      });
      return this.$store.state.profileCondition;
    },
    editSuccess(){
      this.editSuccessReset();
      return this.$store.state.editSuccess;
    }
  },
  methods: {
    revealConfirmation(){
      this.deleteConfirmation = true;
      this.error = false;
    },
    undoDelete(){
      this.deleteConfirmation = false;
    },
    confirmDelete(){
      deleteProfile(this.profile.profileId, (state) => {
        if(state){
          this.$store.commit('setProfileConditionFalse');
        } else {
          this.error = true;
          this.deleteConfirmation = false;
        }
      });
    },
    editSuccessReset(){
      setTimeout(()=>{
        this.$store.commit("setEditFail");
      }, 1200);
    },
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