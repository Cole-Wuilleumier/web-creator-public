var mongoose = require('mongoose');  
var UserSchema = new mongoose.Schema({  
  name: String,
  email: { type: String, unique:true },
  password: String,
  birthday: { type:Date },
  memberSince: { type: Date },
});



//Sets memberSince date for new use using Date.now() so that it will not be changed
UserSchema.pre('save', function setMemberSince(next){
  this.memberSince = Date.now();
  next();
});


mongoose.model('User', UserSchema);

module.exports = mongoose.model('User');