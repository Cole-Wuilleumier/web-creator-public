var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cloudinary = require('cloudinary');
var sightengine = require('sightengine');
var multer = require('multer');
var mkdirp = require('mkdirp');
var fs = require('fs');
var config = require('../../config.js');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//Setup cloudinary to update data to CDN
cloudinary.config({ 
  cloud_name: 'web-creator', 
  api_key: config.cdn_api_key, 
  api_secret: config.cdn_api_secret
});


var Profile = require('./Profile');
var VerifyToken = require('../auth/VerifyToken');

// CREATES A NEW Profile
router.post('/', VerifyToken, function (req, res) {
    Profile.create({
            userId : req.body.userId,
            memberSince: req.body.memberSince,
            name: req.body.name,
            headline: req.body.headline,
            jobTitle: req.body.jobTitle,
            aboutMe: req.body.aboutMe
        }, 
        function (err, profile) {
           // console.log(err);
            if (err) return res.status(500).send("There was a problem adding the information to the database.");
            res.status(200).send(profile);
        });
});

// RETURNS ALL THE PROFILES IN THE DATABASE
router.get('/',  function (req, res) {
    Profile.find({}, function (err, profiles) {
        if (err) return res.status(500).send("There was a problem finding the profiles.");
        res.status(200).send(profiles);
    });
});

// GETS A SINGLE PROFILE FROM THE DATABASE
router.get('/:id',  function (req, res) {
    Profile.findOne({'userId': req.params.id}, function (err, profile) {
        console.log(profile);
        if (err) return res.status(500).send("There was a problem finding the profile.");
        if (!profile) return res.status(404).send("No profile found.");
        res.status(200).send(profile);
    });
});

// DELETES A PROFILE FROM THE DATABASE
router.delete('/:id', function (req, res) {
    Profile.findByIdAndRemove(req.params.id, function (err, profile) {
        if (err) return res.status(500).send("There was a problem deleting the profile.");
        res.status(200).send("Profile: "+ profile.name +" was deleted.");
    });
});

// UPDATES A SINGLE PROFILE IN THE DATABASE
router.put('/:id', VerifyToken, function (req, res) {
    delete req.body.memberSince;
    Profile.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, profile) {
        if (err) return res.status(500).send("There was a problem updating the profile.");
        res.status(200).send(profile);
    });
});



/*BELOW IS PROFILE IMAGE SECTION*/

//POST PROFILE IMAGE
router.post('/image-upload/:id', VerifyToken, function (req, res) {

  //sets up storage for multer
  var Storage = multer.diskStorage({
    destination: (req, file, cb) => {
      //Makes the directory structure the image will go in
      const dir = 'public/uploads/profile-images/'+req.userId;
      mkdirp(dir, err => cb(err, dir));
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now()+ file.originalname);
    }
  });

  var upload = multer({storage: Storage}).single('image');

  //upload image to server
  upload(req,res,function(err){   
      if(err){
        res.status(500).send("Failed to upload image.");
      }
      else{
        var pathToImageOnServer = req.file.destination+'/'+req.file.filename;

        //upload image to cloudinary
        cloudinary.uploader.upload(pathToImageOnServer, function(result) { 

          //delete image on the server
          deleteImageOnServer(pathToImageOnServer);

          //update image path on Profile record in mongodb
          Profile.update({userId: req.userId},{
            //sets profileImage to the url returned by cloudinary
            profileImage: result.url

          },(err, result)=>{

            if(err) res.status(500).send("Image was unable to upload to server.");
            res.status(200).send("Image uploaded successfully.");

          });
        });
      } 
  });
});

//a fuction that is called during the upload process after image is safely loaded to cloudinary
function deleteImageOnServer(imagePath){
  fs.unlink(imagePath,(err)=>{
    if(err){
      console.log(err);
      return;
    } 
    console.log("Image" + imagePath + "successfully removed from server");
  });
}


//DELETES A PROFILE IMAGE
router.post('/delete-image/', VerifyToken, function(req, res) {
  
  console.log(req.body);
  //remove image from cloudinary
  cloudinary.uploader.destroy('http://'+ req.body.profileImageUrl, function(result) {
    //update the mongodb record
    Profile.update({userId: req.body.userId}, {
      profileImage: ''
    }, (err, result)=>{
      if(err){
        res.status(500).send("Failed to delete image");
      } else {
        res.status(200).send("Image deleted successfully!");
      }
    });
  });
});


module.exports = router;