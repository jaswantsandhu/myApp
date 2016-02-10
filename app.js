var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');
var about = require('./routes/about');
//var contact = require('./routes/contact');
//var blogData = require('./routes/blogData');

var app = express();


//Connect DB
mongoose.connect('mongodb://localhost:27017/dataTest');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/about', about);
//app.use('/contact', contact);
//app.use('/blogData', blogData);

//Scheme
var Schema = new mongoose.Schema({
    _id : String,
    Name   : String,
    Description    : String,
    Clink : String,
    comments : [{
        Cname : String,
        Ccomment : String
    }]

});

//Model
var BlogPost = mongoose.model('Blog', Schema);

app.post('/test',function(req,res){
  //console.log('inner' + req.body.imgUpload);
  //var base64ToBuffer = new Buffer(req.body.imgUpload, 'base64');
  //console.log('inner' + base64ToBuffer);
  new BlogPost({
      _id : req.body.Username,
      Name : req.body.Name,
      Description : req.body.Description,
      Clink : req.body.Clink,
      comments : [{
        Cname : String,
        Ccomment : String
    }]
  }).save(function(err, doc){
    if(err){
      console.log('boo');
    }
    else{
      console.log('inner');
      res.redirect('contact');
      
      res.end();
      }
  })
});

app.get('/contact',function(req, res){
  BlogPost.find({},function(err, docs){
      if(err) {
        res.json(err);
        console.log('errrr');
      }
      else{
        //console.log('Data Aaa gaya' + docs);
        res.render('contact', {BlogPost : docs});
      }

  })
})


app.get('/blog/:id', function(req, res) {
  BlogPost.find({_id : req.params.id}, function(err, docs) {
     
        if(err){

          res.json(err);
        }
        else{
          res.render('show', {BlogPost : docs[0]})
        }
        });
});

app.post('/commentform', function(req, res) {
  console.log('dsadas' + req.body.Cname);
  new BlogPost.save({
    comments : [{
        Cname : req.body.Cname,
        Ccomment : req.body.Ccomment
    }]
  },function(err, docs){
      if(err){
        console.log('Error aaya' + err);
      }
      else{
        console.log('innerComments');
        console.log(req.body.Cname);
        res.redirect('/');
        res.end();
      }
  });
});
     



 
   






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
