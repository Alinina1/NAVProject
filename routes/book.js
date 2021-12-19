const {Router} = require('express');
const Comment  = require('../models/comments');
const router = Router();

router.get('/', async (req, res) => {
    res.set("Content-Security-Policy", "frame-src https://lidrekon.ru;");
    const comments = await Comment.find();
    res.render('book', {
        comments
    });
})

router.post('/', async (req, res) =>{
    console.log(req.body);
    const comment = new Comment({
        name: req.body.guest_name,
        commentText: req.body.commentText,
        commentDate: new Date()
    })

    try {
        await comment.save();
        res.redirect('/book');
    } catch (e){
        console.log(e);
    }
})
module.exports = router;