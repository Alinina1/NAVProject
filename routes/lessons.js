const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('lessons');
})

module.exports = router;