import api from '../api';
import Router from 'vue-router';

var router = new Router({
  mode: 'history'
});

//CREATE NEW WEBPAGE
export function postWebpage(webpageContent, callback) {
  let token = localStorage.getItem('token');

  if(!(token == null)){ //makes sure token is set
    let config = {
      headers: {
        'x-access-token': token
      }
    };
    
   api.post('/webpages/', webpageContent, config).then(response => {
      if(response.data){
        callback(response.data, true);
      } else {
        callback('', false);
      }
    })
    .catch((error) => {
      callback(error, false); //Server error
    });
  } else {
    callback('', false);  //No token provided
  }
}

//GETS ALL OF THE WEBPAGES FOR A SELECTED USER
export function getWebpages(userId, callback){
  let token = localStorage.getItem('token');

  if(!(token == null)){ //makes sure token is set
    let config = {
      headers: {
        'x-access-token': token
      }
    };

    api.get('/webpages/'+userId, config).then(response => {
      if(response.data){
        callback(response.data, true); //success
      } else {
        callback('', false); //Server error
      }
    }).catch((error)=>{
      callback('', false);//server error
    });

  } else {
    callback('', false);//no token provided
  }
}

//DELETES A WEBPAGE 
export function deleteWebpage(userId, title, callback){
  let token = localStorage.getItem('token');

  if(!(token == null)){ //makes sure token is set
    let config = {
      headers: {
        'x-access-token': token
      }
    };

    api.delete('/webpages/'+userId+'/'+title, config).then(response => {
      if(response.data){
        callback(response.data, true); //success
      } else {
        callback('', false); //Server error
      }
    }).catch((error)=>{
      callback(error, false);//server error
    });

  } else {
    callback('', false);//no token provided
  }
}