let express = require('express');
let router = express.Router();
const expense = require('../../../services/expense');

/* GET all expenses. */
router.get('/', async (req, res, next) => {
    try {
        let result = await expense.all();
        res.json(result);
    } catch (e) {
        next(e);
    }
});

module.exports = router;
