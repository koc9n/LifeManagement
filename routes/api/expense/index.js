let express = require('express');
let router = express.Router();

/* GET all expenses. */
router.get('/', function (req, res, next) {
    //TODO: implement
    res.json(['1', '2', '3']);
});

module.exports = router;
