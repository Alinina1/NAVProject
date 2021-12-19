const {Router} = require('express');
const Comment  = require('../models/comments');
const Numb  = require('../models/numb');
const router = Router();

router.get('/', async (req, res) => {
    res.set("Content-Security-Policy", "frame-src https://lidrekon.ru;");
    const numb = await Numb.find().limit(1).sort({$natural:-1});
    console.log(numb);
    const comments = await Comment.find();
    res.render('book', {
        comments,
        numb
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