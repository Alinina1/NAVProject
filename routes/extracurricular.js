const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('extracurricular');
})

module.exports = router;