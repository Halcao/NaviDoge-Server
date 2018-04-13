var mongoose = require('../db.js');

const Schema = mongoose.Schema;

// LocationDatabase
const ldbSchema = new Schema({
    Id: Number,
    b_Id: Number,
    a_no: Number,
    type: String,
    relativeCoordinates: [[Number]],
    data: [[Number]]
});

const LDB = mongoose.model('LDB', ldbSchema, 'LDB');

module.exports = LDB;