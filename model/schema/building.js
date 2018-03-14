/**
 * Created by Halcao on 2018/2/5.
 */

var mongoose = require('../db.js');

const Schema = mongoose.Schema;

const buildingSchema = new Schema({
    id: Number,
    name: String,
    address: String,
    geographicLocation: [Number],
    locateEngineConf: {
        Method: String,
        K: Number
    },
    Areas: [{
        no: Number,
        name: String,
        floor: Number,
        altitude: Number,
        relativeCoordinate: [Number],
        size: [Number],
        floorplanFilename: String,
        PFSList: [Number],
        StationList: Number
    }]
});

const Building = mongoose.model('Building', buildingSchema, 'Buildings');

module.exports = Building;