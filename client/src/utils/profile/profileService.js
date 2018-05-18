import api from '../api';
import Router from 'vue-router';

var router = new Router({
  mode: 'history'
});


//GET PROFILE
export function getProfile(userId, callback) {
  let token = localStorage.getItem('token');

  if(!(token == null)){
    let config = {
      headers: {'x-access-token': token}
    };

    api.get('/profiles/' + userId, config).then(response => {
        callback(true, response.data);
      })
      .catch((error) => { 
        callback(false, '');
      });
      
  } else {
    callback(false, '');
  }
}

//GET ALL USERS PROFILES
export function getProfiles(callback) {
  let token = localStorage.getItem('token');

  if(!(token == null)){
    let config = {
      headers: {'x-access-token': token}
    };

    api.get('/profiles/', config).then(response => {
        callback(response.data, true);
      })
      .catch((error) => { 
        callback('', false);
      });
      
  } else {
    callback('', false);
  }
}

//CREATE PROFILE
export function postProfile(userId, memberSince, name, headline, jobTitle, aboutMe, callback) {
  let token = localStorage.getItem('token');
  if(!(token == null)){ //makes sure token is set
    let config = {
      headers: {
        'x-access-token': token
      }
    };
    var profile = {
      userId: userId,
      memberSince: memberSince,
      name: name,
      headline: headline,
      jobTitle: jobTitle,
      aboutMe: aboutMe
    }

    api.post('/profiles/', profile, config).then(response => {
      if(response.data){
        callback(true);
      } else {
        callback(false);
      }
    })
    .catch((error) => {
      //console.log(error);
      callback(false); //Server error
    });
  } else {
    callback(false);  //No token provided
  }
}

//DELETE PROFILE
export function deleteProfile(profileId, callback){
  let token = localStorage.getItem('token');
  if(!(token == null)){ //makes sure token is set
    let config = {
      headers: {'x-access-token': token}
    };
    api.delete('/profiles/' + profileId, config) .then(response => {
      if(response.data){
        callback(true); //Delete success
      } else {
        callback(false); //Server error
      }
    }).catch((error) => {
      console.log(error);
      callback(false); //Server error
    });
  } else {
    callback(false); //No token provided
  }
}

//EDIT PROFILE
export function editProfile(profile, callback){
  let token = localStorage.getItem('token');
  if(!(token == null)){ //makes sure token is set
    let config = {
      headers: {'x-access-token': token}
    };
    api.put('/profiles/'+profile.profileId, profile, config)
    .then(response => {
      if(response.data){
        callback(true);
      } else {
        callback(false);
      }
    })
    .catch((error) => {
      console.log(error);
      callback(false); //Server error
    });
  } else {
    callback(false);  //No token provided
  }
}

//Upload Profile Image
export function uploadProfileImage(file, userId, callback) {
  let token = localStorage.getItem('token');
  if(!(token == null)){ //makes sure token is set
    let config = {
      headers: {
        'x-access-token': token
      }
    };

  api.post('/profiles/image-upload/'+userId, file, config)
  .then(response =>{
    callback(true);//Upload successful
  })
  .catch((error)=>{
    callback(false); //upload failed because of server
  });
} else {
    callback(false);  //No token provided
  }
}

//Delete Profile Image
export function deleteProfileImage(profileImageUrl, userId, callback){
  let token = localStorage.getItem('token');
  if(!(token == null)){ //makes sure token is set
      let config = {
        headers: {
          'x-access-token': token
        }

      };

    let data = {
      profileImageUrl: profileImageUrl,
      userId: userId
    }
    api.post('/profiles/delete-image/', data, config)
    .then(response =>{
      console.log(response.data);
      callback(true);
    })
    .catch((error)=>{
      console.log(error);
      callback(false);
    });
  } else {
      callback(false);  //No token provided
  }
}