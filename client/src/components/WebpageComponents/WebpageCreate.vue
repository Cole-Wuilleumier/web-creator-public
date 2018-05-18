<template>
  <div v-if="!(isLoggedIn)">
      <router-link class="nav-link" :to="{ path: '/login' }">Please Log in</router-link>
  </div>
  <div v-else >
    <div v-if="!(basic) && !(advanced) && !(complex)">
      <!--TEMPLATE SELECT-->
      
      <h1>Select a Template</h1>
      <div class="row row-eq-height">
      <!--Basic Template-->
        <div class="col-sm-12 col-md-12 col-lg-4 col">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <h2>Basic Template</h2>
              </div>
              <div class="card-text">
                <ul class="list-group">
                  <li class="list-group-item">1 main header</li>
                  <li class="list-group-item">2 paragraphs</li>
                </ul>
              </div>
              <div class="card-footer">
                <input type="button" class="btn btn-primary" v-on:click="selectBasic" value="Select"> 
              </div>
            </div>
          </div>
        </div>
        <!--Advanced Template-->
        <div class="col-sm-12 col-md-12 col-lg-4 col">
          <div class="card">
            <div class="card-body">
              <div class="card-title">
                <h2>Advanced Template</h2>
              </div>
              <div class="card-text">
                <ul class="list-group">
                  <li class="list-group-item">1 main header</li>
                  <li class="list-group-item">2 sub headers</li>
                  <li class="list-group-item">4 paragraphs</li>
                </ul>
              </div>
              <div class="card-footer">
                <input type="button" class="btn btn-primary" v-on:click="selectAdvanced" value="Select"> 
              </div>
            </div>
          </div>
        </div>
        <!--Complex Template-->
        <div class="col-sm-12 col-md-12 col-lg-4 col">
            <div class="card">
            <div class="card-body">
              <div class="card-title">
                <h2>Complex Template</h2>
              </div>
              <div class="card-text">
                <ul class="list-group">
                  <li class="list-group-item">1 main header</li>
                  <li class="list-group-item">1 sub header</li>
                  <li class="list-group-item">1 quoted text</li>
                  <li class="list-group-item">4 paragraphs</li>
                </ul>
              </div>
              <div class="card-footer">
                <input type="button" class="btn btn-primary" v-on:click="selectComplex" value="Select"> 
              </div>
            </div>
          </div>
        </div>
      </div><!--END TEMPLATE SELECT-->
    </div>
    <div v-else>

      <!--BASIC-->
      <div v-if="basic">
        <form class="form" @submit.prevent="submitWebpage('basic')">
          <h2>Create a new Basic webpage</h2>
          
          <label for="inputTitle">Title</label>
          <input v-model="webpage.title" type="text" id="inputTitle" class="form-control" placeholder="title" autofocus>

          <label for="inputHeader" >Header</label>
          <input v-model="webpage.header" type="text" id="inputHeader" class="form-control" placeholder="Header" autofocus>

          <label for="inputParagraph">Paragraph</label>
          <textarea v-model="webpage.paragraph" rows="12" id="inputParagraph" class="form-control" placeholder=""></textarea>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Create</button>
          <br>
          <span class="alert alert-danger" v-if="error">{{error}}</span>
        </form>
      </div>

      <!--ADVANCED-->
      <div v-if="advanced">
        <form class="form" @submit.prevent="submitWebpage('advanced')">
          <h2>Create a new Advanced webpage</h2>
          
          <label for="inputTitle">Title</label>
          <input v-model="webpage.title" type="text" id="inputTitle" class="form-control" placeholder="title" autofocus>

          <label for="inputHeader" >Header</label>
          <input v-model="webpage.header" type="text" id="inputHeader" class="form-control" placeholder="Header" >
          
          <label for="inputSubHeader" >Sub Header 1</label>
          <input v-model="webpage.subheader" type="text" id="inputSubHeader" class="form-control" placeholder="Sub Header">

          <label for="inputParagraph">Paragraph 1</label>
          <textarea v-model="webpage.paragraph" rows="12" id="inputParagraph" class="form-control" placeholder=""></textarea>

          <label for="inputParagraph2">Paragraph 2</label>
          <textarea v-model="webpage.paragraph2" rows="12" id="inputParagraph2" class="form-control" placeholder=""></textarea>

          <label for="inputSubHeader2" >Sub Header 2</label>
          <input v-model="webpage.subheader2" type="text" id="inputSubHeader2" class="form-control" placeholder="Sub Header">
          
          <label for="inputParagraph3">Paragraph 3</label>
          <textarea v-model="webpage.paragraph3" rows="12" id="inputParagraph3" class="form-control" placeholder=""></textarea>

          <label for="inputParagraph4">Paragraph 4</label>
          <textarea v-model="webpage.paragraph4" rows="12" id="inputParagraph4" class="form-control" placeholder=""></textarea>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Create</button>

          <br>
          <span class="alert alert-danger" v-if="error">{{error}}</span>
        </form>
      </div>


      <!--COMPLEX-->
      <div v-if="complex">
        <form class="form" @submit.prevent="submitWebpage('complex')">
          <h2>Create a new Complex webpage</h2>
          
          <label for="inputTitle">Title</label>
          <input v-model="webpage.title" type="text" id="inputTitle" class="form-control" placeholder="Title" autofocus>

          <label for="inputHeader" >Header</label>
          <input v-model="webpage.header" type="text" id="inputHeader" class="form-control" placeholder="Header" autofocus>

          <label for="inputSubHeader" >Sub Header</label>
          <input v-model="webpage.subheader" type="text" id="inputSubHeader" class="form-control" placeholder="Sub Header">

          <label for="inputParagraph">Paragraph 1</label>
          <textarea v-model="webpage.paragraph" rows="12" id="inputParagraph" class="form-control" placeholder=""></textarea>

          <label for="inputParagraph2">Paragraph 2</label>
          <textarea v-model="webpage.paragraph2" rows="12" id="inputParagraph2" class="form-control" placeholder=""></textarea>


          <label for="inputQuote" >Quoted Text</label>
          <input v-model="webpage.quote" type="text" id="inputQuote" class="form-control" placeholder="Quoted Text">

          <label for="inputParagraph3">Paragraph 3</label>
          <textarea v-model="webpage.paragraph3" rows="12" id="inputParagraph3" class="form-control" placeholder=""></textarea>

          <label for="inputParagraph4">Paragraph 4</label>
          <textarea v-model="webpage.paragraph4" rows="12" id="inputParagraph4" class="form-control" placeholder=""></textarea>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Create</button>

          <br>
          <span class="alert alert-danger" v-if="error">{{error}}</span>
        </form>
      </div>
    </div>


  </div>
</template>

<script>

import { verifyToken } from '../../utils/auth/login';
import { postWebpage } from '../../utils/webpage/webpageService';

export default {
  name: 'WebpageCreate',
  data () {
    return {
        userId: '',
        webpage:{
          title:'',
          header:'',
          subheader:'',
          subheader2:'',
          paragraph:'',
          paragraph2:'',
          paragraph3:'',
          paragraph4:'',
          paragraph5:'',
          quote:''
        },
        basic: false,
        advanced: false,
        complex: false,
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
  },
  methods: {
  submitWebpage(type){
      this.webpage.type = type;
      this.webpage.userId = this.$store.state.currentUser.userId;
      this.userId = this.$store.state.currentUser.userId;
      postWebpage(this.webpage,(data, state)=>{
        if(state){
          this.$router.push({path:'/me/'+this.userId});
        } else {
          this.error = data.response.data;
        }
      });
    },
    selectBasic(){
      this.basic = true;
    }
    ,
    selectAdvanced(){
      this.advanced = true;
    }
    ,
    selectComplex(){
      this.complex = true;
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

.card-body{
  padding-bottom: 4em;
}
.card-footer{
position:absolute;
  bottom:0;
  width:100%;
}

</style>