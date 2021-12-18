const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.set("Content-Security-Policy", "frame-src https://www.youtube.com;" );
    res.render('fizmin');
})

module.exports = router;