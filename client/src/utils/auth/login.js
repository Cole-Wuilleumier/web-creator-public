import api from '../api';
import Router from 'vue-router';

var router = new Router({
  mode: 'history'
});


//verifyToken
export function verifyToken(callback) {
  let token = localStorage.getItem('token');
  if(!(token == null)){ //makes sure token is set
    let config = {
      headers: {'x-access-token': token}
    };
    
    api.get('/auth/me', config).then(response => { //send token 
        localStorage.setItem('user-id', response.data._id);
        localStorage.setItem('user-name', response.data.name);
        localStorage.setItem('user-email', response.data.email);
        localStorage.setItem('user-memberSince', response.data.memberSince);
        localStorage.setItem('isLoggedIn', true);
        callback(true);
      })
      .catch((error) => { 
        localStorage.setItem('isLoggedIn', false);
        callback(false); //failed because token invalid
      });
      
  } else {
    localStorage.setItem('isLoggedIn', false);
    callback(false); //localStorage.getItem('token') == null
  }
}

//login
export function login(email, password, callback){
  api.post('/auth/login', {email: email, password: password})
  .then(response => {
    if(response.data.auth){
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('isLoggedIn', true);
      callback(true);
    } else {
      localStorage.setItem('token', null);
      localStorage.setItem('isLoggedIn', false);
      console.log(error);
      callback(false);
    }
  })
  .catch((error) => {
    localStorage.setItem('token', null);
    localStorage.setItem('isLoggedIn', false);
    console.log(error);
    callback(false);
  });
}

//logout
export function logout(callback) {
  let token = localStorage.getItem('token');
  if(!(token == null)){ //makes sure token is set

    let config = {
      headers: {'x-access-token': token}
    };

    api.get('/auth/logout', config).then(response => { //send token 
        localStorage.setItem('token', null);
        localStorage.clear();
        callback(); //successfully logged out
      })
      .catch((error) => { 
        console.log(error);
        callback(); //Server error occured
      });
      
  } else {
    callback(); //token not valid
  }
}