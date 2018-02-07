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
var DataPoint = require('../model//kNN').DataPoint;
var kNN = require('../model//kNN').kNN;


function locateRequest(req, res) {
    const locationData = req.body.locationData;
    let data = locationData.find(e => e.dType == 'rssi');
    // for (var data of locationData) {
        // if (data.dType === 'mag') { continue; }
        // TODO: 确定地点
        PFS.findOne({pType: data.dType}, function(err, result) {
            if (err) {
                res.send(JSON.stringify(err));
            }
            var rssis = result.pRssis;
            var coordinates = result.pRelativeCoordinates;
            var dataSet = [];
            for (var i = 0; i < rssis.length; i++) {
                dataSet.push(new DataPoint(rssis[i], coordinates[i]));
            }
            var point = new DataPoint(data.dData.map(e => e === 0 ? -100 : e), []);
            const coordinate = kNN(point, dataSet, 3);

            res.send(JSON.stringify(coordinate));
        })
    // }
}

module.exports = locateRequest;