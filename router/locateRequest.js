// private int rSn;
// private long rTimestamp;
// private LocationData[] locationData;
// private int rDataNum;
// private int rDataTop;
// }

// LocationData {
//     private String dType;
//     private double[] dData;
// }

var PFS = require('../model/schema/pfs');
var DataPoint = require('../model/kNN').DataPoint;
var kNN = require('../model/kNN').kNN;
var candidateSet = require('../model/candidateSet.js')


function locateRequest(req, res) {
    const radius = 5;
    const locationData = req.body.locationData;
    var data = locationData.find(e => e.dType == 'rssi');
    // for (var data of locationData) {
    // if (data.dType === 'mag') { continue; }
    // TODO: 确定地点
    PFS.findOne({ pType: data.dType }, function (err, result) {
        if (err) {
            res.send(JSON.stringify(err));
        }
        var point = new DataPoint(null, data.dData.map(e => e === 0 ? -100 : e), []);
        var values = result.pRssis;
        var coordinates = result.pRelativeCoordinates;
        var dataSet = [];
        for (let i = 0; i < values.length; i++) {
            dataSet.push(new DataPoint(i, values[i], coordinates[i]));
        }
        var res_rssi = kNN(point, dataSet, 3);
        var { coordinate, results } = res_rssi;
        
        point = new DataPoint(null, null, coordinate);
        var candidates = candidateSet(point, dataSet, radius);
        data = locationData.find(e => e.dType == 'mag');
        var ids=candidates.map(v => {return v.id});
        PFS.findOne({ pType: data.dType }, function (err, result) {
            if (err) {
                res.send(JSON.stringify(err));
            }
            point = new DataPoint(null, data.dData, []);
            values = result.pMags;
            coordinates = result.pRelativeCoordinates;
            dataSet = [];
            for (let i = 0; i < ids.length; i++) {
                dataSet.push(new DataPoint(ids[i], values[ids[i]], coordinates[ids[i]]));
            }
            var res_mag = kNN(point, dataSet, 3);
            var { coordinate, results } = res_mag;
            res.send(JSON.stringify(coordinate));
        });
        
    });


    // }
}

module.exports = locateRequest;