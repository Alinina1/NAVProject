const express = require('express');
//const bodyParser = require('body-parser');//для post-запроса
const helmet = require('helmet');
const compression = require('compression');
const app = express();
//const urlencodedParser = bodyParser.urlencoded({ extended: false }); //для post-запроса

app.set('view engine', 'ejs');
app.set('port', (process.env.PORT || 3000));

app.use(helmet());
app.use(compression());
app.use(express.static(__dirname +'/public/'));

app.get('/', function (req, res){
  res.render('home');
})

app.get('/home', function (req, res){
  res.render('home');
})

app.get('/about', function (req, res){
  res.render('about');
})

app.get('/merits', function (req, res){
  res.render('merits');
})

app.get('/photoalbum', function (req, res){
  res.render('photoalbum');
})

app.get('/dictionary', function (req, res){
  res.render('dictionary');
})
//post-запрос
/*
app.post('/home',urlencodedParser, function (req, res){
  if(!req.body) return res.sendStatus(400);
  console.log(req.body);
  res.render('home');
}) 
*/
app.listen(app.get('port'), () => console.log('Server is running'));
