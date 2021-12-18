const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.set("Content-Security-Policy", "frame-src https://ufa-all.ru;");
    res.render('dictionary');
})
module.exports = router;