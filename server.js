const express = require('express');
const bodyParser = require('body-parser');//для post-запроса
//const urlencodedParser = bodyParser.urlencoded({ extended: false }); //для post-запроса
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');
const path = require('path');
const config = require('./config/db');
const account = require('./routes/account');

const app = express();
const port = 3000;

app.use(cors());//для взаимодействия с другими сайтами

mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true});//подключение к базе данных
//при успешном пожкдючении к бд
mongoose.connection.on('connected', () => {
  console.log("OK!");
});
//при неуспешном подключении к бд
mongoose.connection.on('error', (err) => {
  console.log("ERROR!!!: " + err);
});

app.set('view engine', 'ejs');

app.use(bodyParser.json());//для обработки запросов

app.use(express.static(path.join(__dirname, 'public')));//подключение статической папки

require('./config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session());



app.get('/', (req, res) => {
  res.render('about');
});

app.get('/home',(req, res) =>{
  res.render('home');
});

app.get('/about', function (req, res){
  res.render('about');
});

app.use('/account', account);

//post-запрос
/*
app.post('/home',urlencodedParser, function (req, res){
  if(!req.body) return res.sendStatus(400);
  console.log(req.body);
  res.render('home');
}) 
*/
app.listen(3000, () => console.log('Server is running. Port ' + port));
