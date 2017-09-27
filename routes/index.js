let express = require('express');
let router = express.Router();
let api = require('./api/index');

router.use('/api/', api);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});


module.exports = router;
