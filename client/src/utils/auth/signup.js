import api from '../api';
import Router from 'vue-router';

var router = new Router({
    mode: 'history'
});

export function register(name, email, password, birthday, callback){
    api.post('/auth/register', {name:name, email: email, password: password, birthday: birthday })
    .then(response => {
    if(response.data.auth){
      localStorage.setItem('token', response.data.token);
      callback(true);
    } else {
      localStorage.setItem('token', null);
      console.log(error);
      callback(false);
    }
  })
  .catch((error) => {
    localStorage.setItem('token', null);
    console.log(error);
    callback(false);
  });
}