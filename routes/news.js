const {Router} = require('express');
const News  = require('../models/news');
const router = Router();

router.get('/', async (req, res) => {
    res.set("Content-Security-Policy", "frame-src https://lidrekon.ru;");
    const news = await News.find();
    res.render('news', {news});
})

router.post('/', async (req, res) =>{
    const news = new News({
        newsText: req.body.newsText,
    })

    try {
        await news.save();
        res.redirect('/news');
    } catch (e){
        console.log(e);
    }
})
module.exports = router;