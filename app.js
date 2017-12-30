var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

var mongo = process.env.MONGODB_URI || 'mongodb://localhost';
mongoose.connect(mongo  '/contact_groups_server');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var Contact = require('../../models/contacts.js');

app.get('/contact', function(req, res) {
   return Contact.find(function (err, contact) {
       if (!err) {
           return res.send(contacts);
       } else {
           res.statusCode = 500;
           log.error('Internal error(%d): %s',res.statusCode,err.message);
           return res.send({ error: 'Server error' });
       }
   });
 });
 
 app.post('/contact', function(req, res) {
   var contact = new Contact({
       name: req.body.name,
       number: req.body.number,
   });
 
   contact.save(function (err) {
       if (!err) {
           log.info("contact created");
           return res.send({ status: 'OK', contact:contact });
       } else {
           console.log(err);
           if(err.name == 'ValidationError') {
               res.statusCode = 400;
               res.send({ error: 'Validation error' });
           } else {
               res.statusCode = 500;
               res.send({ error: 'Server error' });
           }
           log.error('Internal error(%d): %s',res.statusCode,err.message);
       }
   });
 });
 
 app.get('/contact/:id', function(req, res) {
   return Contact.findById(req.params.id, function (err, contact) {
       if(!contact) {
           res.statusCode = 404;
           return res.send({ error: 'Not found' });
       }
       if (!err) {
           return res.send({ status: 'OK', contact:contact });
       } else {
           res.statusCode = 500;
           log.error('Internal error(%d): %s',res.statusCode,err.message);
           return res.send({ error: 'Server error' });
       }
   });
 });
 
 app.put('/contact/:id', function (req, res){
   return Contact.findById(req.params.id, function (err, contact) {
       if(!contact) {
           res.statusCode = 404;
           return res.send({ error: 'Not found' });
       }
 
       contact.name = req.body.name;
       contact.number = req.body.number;
       return contact.save(function (err) {
           if (!err) {
               log.info("contact updated");
               return res.send({ status: 'OK', contact:contact });
           } else {
               if(err.name == 'ValidationError') {
                   res.statusCode = 400;
                   res.send({ error: 'Validation error' });
               } else {
                   res.statusCode = 500;
                   res.send({ error: 'Server error' });
               }
               log.error('Internal error(%d): %s',res.statusCode,err.message);
           }
       });
   });
 });
 
 app.delete('/contact/:id', function (req, res){
   return Contact.findById(req.params.id, function (err, contact) {
       if(!contact) {
           res.statusCode = 404;
           return res.send({ error: 'Not found' });
       }
       return contact.remove(function (err) {
           if (!err) {
               log.info("contact removed");
               return res.send({ status: 'OK' });
           } else {
               res.statusCode = 500;
               log.error('Internal error(%d): %s',res.statusCode,err.message);
               return res.send({ error: 'Server error' });
           }
       });
   });
 });

 app.get('/group', function(req, res) {
   return Group.find(function (err, group) {
       if (!err) {
           return res.send(group);
       } else {
           res.statusCode = 500;
           log.error('Internal error(%d): %s',res.statusCode,err.message);
           return res.send({ error: 'Server error' });
       }
   });
 });
 
 app.post('/group', function(req, res) {
   var group = new Group({
       name: req.body.name,
       number: req.body.number,
   });
 
   group.save(function (err) {
       if (!err) {
           log.info("group created");
           return res.send({ status: 'OK', group:group });
       } else {
           console.log(err);
           if(err.name == 'ValidationError') {
               res.statusCode = 400;
               res.send({ error: 'Validation error' });
           } else {
               res.statusCode = 500;
               res.send({ error: 'Server error' });
           }
           log.error('Internal error(%d): %s',res.statusCode,err.message);
       }
   });
 });
 
 app.get('/group/:id', function(req, res) {
   return Group.findById(req.params.id, function (err, group) {
       if(!group) {
           res.statusCode = 404;
           return res.send({ error: 'Not found' });
       }
       if (!err) {
           return res.send({ status: 'OK', group:group });
       } else {
           res.statusCode = 500;
           log.error('Internal error(%d): %s',res.statusCode,err.message);
           return res.send({ error: 'Server error' });
       }
   });
 });
 
 app.put('/group/:id', function (req, res){
   return Group.findById(req.params.id, function (err, group) {
       if(!group) {
           res.statusCode = 404;
           return res.send({ error: 'Not found' });
       }
 
       group.name = req.body.name;
       group.number = req.body.number;
       return group.save(function (err) {
           if (!err) {
               log.info("group updated");
               return res.send({ status: 'OK', group:group });
           } else {
               if(err.name == 'ValidationError') {
                   res.statusCode = 400;
                   res.send({ error: 'Validation error' });
               } else {
                   res.statusCode = 500;
                   res.send({ error: 'Server error' });
               }
               log.error('Internal error(%d): %s',res.statusCode,err.message);
           }
       });
   });
 });
 
 app.delete('/group/:id', function (req, res){
   return Group.findById(req.params.id, function (err, group) {
       if(!group) {
           res.statusCode = 404;
           return res.send({ error: 'Not found' });
       }
       return group.remove(function (err) {
           if (!err) {
               log.info("group removed");
               return res.send({ status: 'OK' });
           } else {
               res.statusCode = 500;
               log.error('Internal error(%d): %s',res.statusCode,err.message);
               return res.send({ error: 'Server error' });
           }
       });
   });
 });

module.exports = app;
