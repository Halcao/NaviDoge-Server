/**
 * Created by Halcao on 2018/2/5.
 */

var mongoose = require('../db.js');

const Schema = mongoose.Schema;

const areaSchema = new Schema({
    no: Number,
    name: String,
    floor: Number,
    altitude: Number,
    relativeCoordinate: [Number],
    size: [Number],
    floorplanFilename: String,
    PFSList: [Number],
    StationList: Number
});

const Area = mongoose.model('Area', areaSchema, 'Areas');

module.exports = Area;