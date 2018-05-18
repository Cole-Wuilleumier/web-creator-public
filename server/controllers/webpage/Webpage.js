var mongoose = require('mongoose');  
var WebpageSchema = new mongoose.Schema({  
  userId: { type: String, required:true },
  url: { type:String, unique:true, required:true },
  title: { type:String, unique:true, required:true }
});
mongoose.model('Webpage', WebpageSchema);

module.exports = mongoose.model('Webpage');