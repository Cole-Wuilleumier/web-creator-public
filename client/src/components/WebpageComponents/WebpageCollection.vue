<template>
  <div v-if="getUserWebpages">
    <div class="card-body" v-for="(webpage, index) in webpages" :key="webpage.title">
      <div>
        <a v-bind:href="webpage.url" target="_blank" ><h3>{{webpage.title}}</h3></a>
        <span v-if="userId == webpage.userId">
          <input type="button" class="btn  btn-danger" v-on:click="submitDeleteWebpage(webpage, index)" value="Delete Webpage">
        </span>
      </div>
    </div>
    <div v-if="error">
      <p>{{error}}</p>
    </div>
  </div>
</template>

<script>

import { verifyToken } from '../../utils/auth/login';
import { getWebpages, deleteWebpage } from '../../utils/webpage/webpageService';

export default {
  name: 'WebpageCollection',
  data () {
    return {
      userId:'',
      webpages:[],
      error:false
    }
  },
  computed: {
    getUserWebpages(){
      this.userId = this.$store.state.currentUser.userId;
      getWebpages( this.$route.params.id, (webpages, state) => {
        if(state){
          this.webpages = webpages;
          this.$store.commit("setWebpagesRecieved");
        } else {
          this.$store.commit("setWebpagesFailed");
        }
      });
      return this.$store.state.webpagesRecieved;
    }
  },
  methods: {
    submitDeleteWebpage(webpage, index){
      this.webpages.splice(index, 1);
      deleteWebpage(webpage.userId, webpage.title, (data, state)=>{});   
    }
  }
}
</script>

<style lang="css">
</style>