let express = require('express');
let router = express.Router();

router.use('/api/',);

/* GET all profits. */
router.get('/', function (req, res, next) {
    //TODO: implement
    res.json(['1', '2', '3']);
});

module.exports = router;
