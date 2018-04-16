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
    Areas: [{
        no: Number,
        name: String,
        floor: Number,
        altitude: Number,
        relativeCoordinate: [Number],
        size: [Number],
        floorplanFilename: String,
        locationDatabases: [Number],
        locateEngineConf: {
            Method: String,
            K: Number
        },
        // stations: {
        //     d_id: Number,
        //     type: String,
        //     addresses: [String],
        //     parameters: [Number]
        // }
        stations: [String]
    }]
});

const Building = mongoose.model('Building', buildingSchema, 'Buildings');

module.exports = Building;