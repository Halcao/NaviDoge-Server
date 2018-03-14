var mongoose = require('../db.js');

const Schema = mongoose.Schema;

// Fingerprint Database
const pfsSchema = new Schema({
    pId: Number,
    asId: Number,
    pType: String,
    pRelativeCoordinates: [[Number]],
    pRssis: [[Number]],
    pBssids: [String],
    pMags: [[Number]]
});

const PFS = mongoose.model('PFS', pfsSchema, 'PFS');

module.exports = PFS;