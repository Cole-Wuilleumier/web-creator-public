import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      isLoggedIn: localStorage.getItem('isLoggedIn'),
      currentUser: '',
      profileCondition: false,
      editSuccess: false,
      profilesRecieved: false,
      webpagesRecieved: false
    },
    mutations: {
      setLoginTrue: (state) => {
        state.isLoggedIn = true;
      },
      setLoginFalse: (state) => {
        state.isLoggedIn = false;
      },
      setCurrentUser: (state, currentUser) => {
        state.currentUser = { name: currentUser.name, email: currentUser.email, userId: currentUser.id, memberSince: currentUser.memberSince }; 
      },
      setProfileConditionTrue: (state) => {
        state.profileCondition = true;
      },
      setProfileConditionFalse: (state) => {
        state.profileCondition = false;
      },
      setEditSuccessful:(state) =>{
        state.editSuccess = true;
      },
      setEditFail:(state)=>{
        state.editSuccess = false;
      },
      setProfilesRecieved:(state) =>{
        state.profilesRecieved = true;
      },
      setProfilesFailed:(state)=>{
        state.profilesRecieved = false;
      },
      setWebpagesRecieved:(state) =>{
        state.webpagesRecieved = true;
      },
      setWebpagesFailed:(state)=>{
        state.webpagesRecieved = false;
      }
    }
  });
