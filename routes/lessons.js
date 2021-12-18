const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.set("Content-Security-Policy", "frame-src https://lidrekon.ru;");
    res.render('lessons');
})

module.exports = router;