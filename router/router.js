const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.send('fuck');
})

router.use('/User', require('./User/User.router.js'))

router.use('/Survey', require('./Survey/Survey.router.js'))


module.exports = router;
