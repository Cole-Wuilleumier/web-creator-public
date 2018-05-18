var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var mkdirp = require('mkdirp');
var fs = require('fs');
var path = require('path');
var config = require('../../config.js');
var striptags = require('striptags');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

var Webpage = require('./Webpage');
var VerifyToken = require('../auth/VerifyToken');

//Encodes for url use
function encodeForUrl(titleString){
  return encodeURIComponent(titleString);
}

function decodeAfterUrl(encodedTitleString){
  return decodeURIComponent(encodedTitleString);
}

// CREATES A NEW Webpage
router.post('/', VerifyToken, function (req, res) {
  if(req.body.title == '' || req.body.title == null) {
    res.status(500).send("You must include a title")
  } else {
    //IF WEBPAGE TITLE ALREADY EXISTS FOR USER DON'T MAKE NEW WEBPAGE
    Webpage.find({"title":req.body.title}, function(err, data){
      if(!(data.length == 0)){
        res.status(500).send("That title has already been used!");
      } else {
        Webpage.create({
          userId : req.body.userId,
          url: 'http://localhost:3000/api/webpages/'+req.body.userId+'/'+encodeForUrl(req.body.title),
          title: req.body.title
        }, 
          function (err, webpage) {
              if (err) return res.status(500).send("There was a problem adding the information to the database.");
              constructWebpage(req.body);
              res.status(200).send(webpage);
        });
      }
    });
  }
});

//Function used to create html files using user input
function constructWebpage(data){
  var dir = 'public/webpages/'+data.userId+'/';
  if(data.type == "basic"){
    var webContentString = `
    <!DOCTYPE html>
    <html>  
      <head>
        <title>`+ striptags(data.title)+`</title>
        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">
      </head>
      <body>
        <div class="container">
          <div class="row" style="margin-top: 10vh;">
            <div class="col-lg-12 text-center">
              <h1>`+striptags(data.header)+`</h1>
              <p>`+striptags(data.paragraph)+`</p>
            </div>
          </div>
        </div>
      </body>
    </html>        
  `;
  } else if(data.type == "advanced"){
    var webContentString = `
    <!DOCTYPE html>
    <html>  
      <head>
        <title>`+striptags(data.title)+`</title>
        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">
      </head>
      <body>
      <div class="container">
        <div class="row" style="margin-top: 10vh;">
          <div class="col-lg-12">
            <h1>`+striptags(data.header)+`</h1>
            <h3>`+striptags(data.subheader)+`</h3>
            <div class="col-lg-6 col-md-8 col-sm-12 col">
              <p>`+striptags(data.paragraph)+`</p>
            </div>
            <div class="col-lg-6 col-md-8 col-sm-12 col">
              <p>`+striptags(data.paragraph2)+`</p>
            </div>
            <h3>`+striptags(data.subheader2)+`</h3>
            <div class="col-lg-6 col-md-8 col-sm-12 col">
              <p>`+striptags(data.paragraph3)+`</p>
            </div>
            <div class="col-lg-6 col-md-8 col-sm-12 col">
              <p>`+striptags(data.paragraph4)+`</p>
            </div>
          </div>
        </div>
      </div>
      </body>
    </html>        
  `;
  } else if(data.type == "complex"){
    var webContentString = `
    <!DOCTYPE html>
    <html>  
      <head>
        <title>`+striptags(data.title)+`</title>
        <link rel="stylesheet" type="text/css" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css">
      </head>
      <body>
      <div class="container">
        <div class="row" style="margin-top: 10vh;">
          <div class="col-lg-12">
            <h1>`+striptags(data.header)+`</h1>
            <h3>`+striptags(data.subheader)+`</h3>
            <div class="col-lg-6 col-md-8 col-sm-12 col">
              <p>`+striptags(data.paragraph)+`</p>
              <p>`+striptags(data.paragraph2)+`</p>
            </div>
            <div class="col-lg-6 col-md-8 col-sm-12 col">
            <blockquote class="blockquote text-center">"`+striptags(data.quote)+`"</blockquote>
            </div>
            <div class="col-lg-6 col-md-8 col-sm-12 col">
              <p>`+striptags(data.paragraph3)+`</p>
              <p>`+striptags(data.paragraph4)+`</p>
            </div>
          </div>
        </div>
      </body>
    </html>        
  `;
  }

  mkdirp(dir, (err)=>{
      fs.writeFile(dir+encodeForUrl(data.title)+'.html', webContentString, function (err) {
        console.log("Webpage created");
      });  
  });
}


//GETS ALL WEBPAGES FOR A PARTICULAR USER
router.get('/:id', VerifyToken, function(req, res){
  Webpage.find({'userId': req.params.id}, function (err, webpages) {
    if (err) return res.status(500).send("There was a problem finding the webpages.");
    res.status(200).send(webpages);
  });
});

//SEND AN HTML FILE
router.get('/:id/:title', function(req, res){
  Webpage.find({'userId': req.params.id, 'title':req.params.title}, function (err, webpage) {
    if (err) return res.status(500).send("There was a problem finding that webpage.");
    res.sendFile(path.resolve('public/webpages/'+req.params.id+'/'+encodeForUrl(req.params.title)+'.html'));
  });
});


//DELETES A SELECTED WEBPAGE based on userId and title
router.delete('/:id/:title', VerifyToken, function(req, res){
  deleteHtmlFile(req.params.id, req.params.title, function(){
    Webpage.remove({'userId':req.params.id, 'title':req.params.title}, function(err){
      if(err){ 
        res.status(500).send('Unable to delete this webpage.');
      } else {
        res.status(200).send('Webpage successfully deleted!');
      }
      
    });
  });
});


//Deletes html file for webpage off of the server
function deleteHtmlFile(id, title, callback){
  fs.unlink('public/webpages/'+id+'/'+title+'.html',(err)=>{
    callback();
  });
}

module.exports = router;