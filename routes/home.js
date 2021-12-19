const {Router} = require('express');
const Numb  = require('../models/numb');
const router = Router();

router.get('/', (req, res) => {
    res.set("Content-Security-Policy", "frame-src https://lidrekon.ru;");
    res.render('home');
})

router.post('/', async (req, res) =>{
    console.log(req.body);
    const numb = new Numb({
        kol: req.body.myNumber,
    })

    try {
        await numb.save();
        res.redirect('/home');
    } catch (e){
        console.log(e);
    }
})

module.exports = router;