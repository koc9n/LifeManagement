let express = require('express');
let router = express.Router();
let api = require('./api');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.use('/api/', api);

module.exports = router;
