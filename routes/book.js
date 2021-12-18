const {Router} = require('express');
const Comment  = require('../models/comments');
const router = Router();

router.get('/', (req, res) => {
    const comments = await Comment.find();
    res.render('book', {

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