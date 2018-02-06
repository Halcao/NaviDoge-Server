/**
 * Created by Halcao on 2018/2/5.
 */

var mongoose = require('../db.js');

const Schema = mongoose.Schema;

const areaSchema = new Schema({
    aId: Number,
    aName: String,
    aAddress: String,
    aGeographicLocation: [Number],
    aLocateEngineConf: {
        Method: String,
        K: Number
    }
});

const Area = mongoose.model('Area', areaSchema, 'Areas');

module.exports = Area;