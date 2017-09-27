let express = require('express');
let router = express.Router();
let income = require('./income');
let expense = require('./expense');
let profit = require('./profit');

router.use('/income/', income);
router.use('/expense/', expense);
router.use('/profit/', profit);

module.exports = router;
