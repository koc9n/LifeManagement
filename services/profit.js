/**
 * Created by konstantin.mironchik on 9/28/2017.
 */
const profit = require('../models/mongoose/entity/profit');
exports.all = (filter = {}) => profit.findAll(filter);
