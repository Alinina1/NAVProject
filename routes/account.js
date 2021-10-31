const express = require('express');
const router = express.Router();
const User = require("../models/user");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/db');

router.get('/auth', function (req, res){
    //res.render('about');
    res.send('Страница авторизации');
  });

router.get('/dashboard',passport.authenticate('jwt', {session: false}), function (req, res){
    //res.render('about');
    res.send('Кабинет');
});

router.get('/reg', function (req, res){
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        login: req.body.login, 
        password: req.body.password
    });

    User.addUser(newUser, (err, user) => {
        if(err)
            res.json({success: false, msg: 'Пользователь не был добавлен!'});
        else
            res.json({success: true, msg: 'Пользователь добавлен!'});
    });
});

module.exports = router;