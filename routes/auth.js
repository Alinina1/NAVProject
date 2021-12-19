const {Router} = require('express');
const User = require('../models/user')
const router = Router();

router.get('/login', async (req, res) => {
    res.set("Content-Security-Policy", "frame-src https://lidrekon.ru;");
    res.render('auth/login');
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => {
        res.redirect('/auth/login');
    })
})

router.post('/login', async (req, res) => {
    try {
        const {name, password} = req.body;

        const candidate = await User.findOne({name})
        console.log("name: " + name + ", password: " + password + ", req.body: ", req.body);
        if (candidate) {
            const areSame = password === candidate.password;
            if (areSame) {
                req.session.user = candidate;
                req.session.isAuthenticated = true;
                req.session.save(err => {
                    if (err) {
                        throw err;
                    }
                    res.redirect('/home')
                });
            } else {
                res.redirect('/auth/login')
            }
        } else {
            res.redirect('/auth/login')
        }
    } catch (e) {
        console.log(e);
    }
})
module.exports = router;