var mongoose = require('mongoose');  
var ProfileSchema = new mongoose.Schema({  
  userId: { type: String, unique:true, required: true },
  memberSince: { type: Date, required: true },
  name: { type: String, rquired: true },
  headline: { type: String },
  jobTitle: { type: String },
  aboutMe: { type: String },
  profileImage: { type: String }
});
mongoose.model('Profile', ProfileSchema);

module.exports = mongoose.model('Profile');