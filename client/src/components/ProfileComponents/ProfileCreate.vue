<template>
  <div v-if="!(isLoggedIn)">
      <router-link class="nav-link" :to="{ path: '/login' }">Please Log in</router-link>
  </div>
  <div v-else>
    <form class="form" @submit.prevent="submitProfile">
      <h2>Create a profile by updating the fields below</h2>
      
      <label for="inputHeadline" >Headline</label>
      <p>Have a favorite quote or inspirational saying? Use it to let people know who you are.</p>
      <input v-model="headLine" type="text" id="inputHeadline" class="form-control" placeholder="Headline" autofocus>

      <label for="inputJobTitle" >Job Title</label>
      <p>Where do you work? What do you do?</p>
      <input v-model="jobTitle" type="text" id="inputJobTitle" class="form-control" placeholder="Job Title">

      <label for="inputAboutMe">About Me</label>
      <p>Here is your chance to tell people about yourself.</p>
      <textarea v-model="aboutMe" rows="12" id="inputAboutMe" class="form-control" placeholder=""></textarea>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Create</button>
      <br>
      <span class="alert" v-if="error">{{error}}</span>
    </form>
  </div>
</template>

<script>

import { verifyToken } from '../../utils/auth/login';
import { postProfile } from '../../utils/profile/profileService';

export default {
  name: 'ProfileCreate',
  data () {
    return {
        userId: '',
        name: '',
        headLine: '',
        jobTitle: '',
        aboutMe: '',
        memberSince:'',
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
    }
  },
  methods: {
    submitProfile(){
      this.userId = this.$store.state.currentUser.userId;
      this.name = this.$store.state.currentUser.name;
      this.memberSince = this.$store.state.currentUser.memberSince;
      postProfile(this.userId, this.memberSince, this.name, this.headLine, this.jobTitle, this.aboutMe,(state)=>{
        if(state){
          this.$router.push({path:'/me/'+this.userId});
        } else {
          this.error = "An error occured";
        }
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