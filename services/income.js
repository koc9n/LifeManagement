/**
 * Created by konstantin.mironchik on 9/28/2017.
 */
const income = require('../models/mongoose/entity/income');
exports.all = (filter = {}) => income.findAll(filter);
