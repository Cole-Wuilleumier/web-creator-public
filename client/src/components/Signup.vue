<template>
  <div class="form-signin" v-if="!isLoggedIn">
    <form @submit.prevent="register">
      <h2>Sign up</h2>
      
      <label for="signupName" >Full name</label>
      <input v-model="name" type="text" id="signupName" class="form-control" placeholder="Full name" required autofocus>
      <label for="signupEmail" >Email address</label>
      <input v-model="email" type="email" id="signupEmail" class="form-control" placeholder="Email address" required autofocus>
      <label for="signupPassword">Password</label>
      <input v-model="password" type="password" id="signupPassword" class="form-control" placeholder="Password" required>
      <label for="signupBirthday">Your Birthday:</label>
      <input v-model="birthday" type="date" id="signupBirthday" class="form-control" placeholder="birthday" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
      <br>
      <span class="alert" v-if="error">{{error}}</span>
      <span class="alert danger-alert" v-if="birthdayValidationFail">You must be at least 13 to create an account.</span>
    </form>
  </div>
  <div v-else>
    You are already signed in<br>
    <router-link :to="'/'">Return Home</router-link>
  </div>
</template>

<script>

import { verifyToken } from '../utils/auth/login';
import { register } from '../utils/auth/signup';

export default {
  name: 'Signup',
  data () {
    return {
      name: '',
      email: '',
      password: '',
      birthday: '',
      error: false,
      birthdayValidationFail: false
    }
  },
  computed: {
    isLoggedIn(){
      return this.$store.state.isLoggedIn;
    }
  },
  methods: {
    register() {
      //Validates that user is at least 13
      var thirteenYearsAgo = new Date;
      thirteenYearsAgo = thirteenYearsAgo.setFullYear(thirteenYearsAgo.getFullYear()-13);
      this.birthday = new Date(this.birthday);
      var birthdayCheck = this.birthday.setFullYear(this.birthday.getFullYear());

      //throw error is birthday check fails
      if(birthdayCheck >= thirteenYearsAgo ){
        this.birthdayValidationFail = true;
        return;
      } 

      register(this.name, this.email, this.password, this.birthday, (state)=>{
        if(state==false){
          this.error = "The credentials you entered are not valid. Please try again."
        } else {
          //Verify token and set currentUser in store
          verifyToken(()=>{
            this.$store.commit('setLoginTrue');
            var currentUser = {
              id: localStorage.getItem('user-id'),
              name: localStorage.getItem('user-name'),
              email: localStorage.getItem('user-email'),
              memberSince: localStorage.getItem('user-memberSince')
            };
            this.$store.commit('setCurrentUser', currentUser);
            this.$router.push({path:'/'});
          });
        }
      });
    }
  }
}
</script>

<style lang="css">
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}

.form-signin .form-control:focus {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>