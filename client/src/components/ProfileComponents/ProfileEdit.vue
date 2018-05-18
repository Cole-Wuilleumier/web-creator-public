<template>
  <div v-if="!(isLoggedIn)">
      <router-link class="nav-link" :to="{ path: '/login' }">Please Log in</router-link>
  </div>
  <div v-else>
    <div v-if="hasProfile">
          <router-link class="btn btn-primary d-inline-block" role="button" :to="{ path: '/profile-image-upload'}">Upload a Profile Image</router-link>
          <div v-if="profile.profileImage != null || profile.profileImage != ''">
            <input type="button" class="btn btn-primary d-inline-block" role="button" v-on:click="deleteImage" value="Delete Profile Image">
          </div>

      
      <form class="form" @submit.prevent="submitEdit">
        <h2>Edit your profile by updating the fields below</h2>
        
        <label for="inputHeadline" >Headline</label>
        <p>Have a favorite quote or inspirational saying? Use it to let people know who you are.</p>
        <input v-model="profile.headLine" type="text" id="inputHeadline" class="form-control" autofocus>

        <label for="inputJobTitle" >Job Title</label>
        <p>Where do you work? What do you do?</p>
        <input v-model="profile.jobTitle" type="text" id="inputJobTitle" class="form-control">

        <label for="inputAboutMe">About Me</label>
        <p>Here is your chance to tell people about yourself.</p>
        <textarea v-model="profile.aboutMe" rows="12" id="inputAboutMe" class="form-control"></textarea>
        <button class="btn btn-lg btn-primary" type="submit">Submit Edits</button>
        <br>
        <span class="alert" v-if="error">{{error}}</span>
      </form>

      <div class="row">
        <div class="col-lg-12 col-md-12 col">
          <p class="text-center"><img class="img-rounded img-responsive" v-bind:src="profile.profileImage" /></p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No profile found</p>
    </div>
  </div>
</template>

<script>

import { verifyToken } from '../../utils/auth/login';
import { getProfile, editProfile, deleteProfileImage } from '../../utils/profile/profileService';

export default {
  name: 'ProfileEdit',
  data () {
    return {
        profile:'',
        error:''
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

          this.$store.commit('setProfileConditionTrue');
        } else {
          this.$store.commit('setProfileConditionFalse');
        }
      });
      return this.$store.state.profileCondition;
    }
  },
  methods: {
    submitEdit(){
      this.profile.userId = this.$store.state.currentUser.userId;
      this.profile.name = this.$store.state.currentUser.name;
      editProfile(this.profile,(state)=>{
        if(state){
          this.$store.commit("setEditSuccessful");
          this.$router.push({path:'/me/'+this.userId});
        } else {
          console.log(error);
          this.$store.commit("setEditFail");
          this.error = "An error occured";
        }
      });
    },
    deleteImage(){
      deleteProfileImage(this.profile.profileImage, this.profile.userId, (state)=>{
        if(state){ this.$router.push({path:'/me/'+this.userId}); }
      });
    }
  }
}
</script>

<style lang="css">
.form {
  width: 100%;
  max-width: 600px;
  padding: 15px;
  margin: auto;
}

.form .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
</style>