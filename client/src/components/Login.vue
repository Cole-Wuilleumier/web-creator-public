<template>
  <div v-if="!isLoggedIn">
    <form class="form-signin" @submit.prevent="login">
      <h2>Please sign in</h2>
      
      <label for="inputEmail" >Email address</label>
      <input v-model="email" type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
      <label for="inputPassword">Password</label>
      <input v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Password" required>
      <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
      <br>
      <span class="alert" v-if="error">{{error}}</span>
    </form>
  </div>
  <div v-else>
    You are already signed in<br>
    <router-link :to="'/'">Return Home</router-link>
  </div>
</template>

<script>

import { verifyToken, login } from '../utils/auth/login';

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      error: false
    }
  },
  computed: {
    isLoggedIn(){
      return this.$store.state.isLoggedIn;
    }
  },
  methods: {
    login () {
      login(this.email, this.password, (state)=>{
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