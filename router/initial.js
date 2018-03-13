var Building = require('../model/schema/building.js');

const initial = function (req, res) {
    var bssids = req.body.bssids;
    var geographicLocation = req.body.geographicLocation;
    var timestamp = req.body.timestamp;
    // TODO: get building
    Building.find({pType: 'rssi' }, function (err, result) {
        if (err) {
            var result = {
                error_code: 1,
                error_message: err
            }
            res.send(JSON.stringify(result));
        }
        var result = {
            building: {
                address: "",
                geographicLocation: [

                ],
                name: "",
                id: ""
            },
            area: {
                name: "",
                relativeCoordinate: [

                ],
                size: [

                ],
                floor: 5,
                altitude: 25,
                no: 2        
            },
            locateEngineConf: {
                Method: "RADAR",
                K: 3
            },
            floorplan: "55_5.svg",
            timestamp: 176435086,
            bssids: [
                "00:1d:0f:92:b6:e4",
            ]        
        };
        res.send(result);
    });
}

module.exports = initial;