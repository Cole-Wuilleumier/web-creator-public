<template>
  <div v-if="!(isLoggedIn)">
      <router-link class="nav-link" :to="{ path: '/login' }">Please Log in</router-link>
  </div>
  <div v-else>

    <form class="form" enctype="multipart/form-data" @submit.prevent="submitProfileImage">
      <label>File
        <input class="btn btn-primary" role="button" type="file" id="file" ref="file" accept="image/*" v-on:change="handleFileUpload()"/>
      </label>
        <input class="btn btn-primary" role="button" type="submit" value="Submit">
      <br>
      <span class="alert" v-if="error">{{error}}</span>
    </form>
  </div>
</template>

<script>

import { verifyToken } from '../../utils/auth/login';
import { uploadProfileImage } from '../../utils/profile/profileService';


export default {
  name: 'ProfileImageUpload',
  data () {
    return {
        file: '',
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
    handleFileUpload(){
      this.file = this.$refs.file.files[0];
      this.userId = this.$store.state.currentUser.userId;

      let formData = new FormData();
      formData.append('image', this.file);

    },
    submitProfileImage(){
      let formData = new FormData();
      formData.append('image', this.file);
      uploadProfileImage(formData, this.userId, (state)=>{
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

#upload-image{
  max-width: 75vw;
  max-height: 100vh;
}
</style>