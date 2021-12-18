const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.set("Content-Security-Policy", "frame-src https://onedrive.live.com;" );
    res.render('portfolio');
})

module.exports = router;