/**
 * Created by konstantin.mironchik on 9/28/2017.
 */
const expense = require('../models/mongoose/entity/expense');
exports.all = (filter = {}) => expense.find(filter);
