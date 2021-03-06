/**
 * Created by koc9n on 8/20/2016 AD.
 */

const moment = require('moment');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const expense = new Schema({
    deletedAt: {
        type: Date,
        nullable: true,
        default: null
    },
    startDate: {
        type: Date,
        nullable: false,
        default: new Date()
    },
    endDate: {
        type: Date,
        nullable: false,
        default: new Date()
    },
    name: String,
    description: String,
    value: Number,
    // user: {type: Schema.Types.ObjectId, ref: 'user'}
}, {
    timestamps: true
});

// schema.plugin(mongoosePaginate);

module.exports = mongoose.model('expense', expense);
