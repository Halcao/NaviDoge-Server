var LDB = require('../model/schema/ldb.js');
var DataPoint = require('../model/kNN').DataPoint;
var kNN = require('../model/kNN').kNN;
var candidateSet = require('../model/candidateSet.js');
const log4js = require('log4js');

const locate = function (req, res) {
    const radius = 5;
    const locationData = req.body.locationData;
    var data = locationData.find(e => e.dType == 'rssi');
    var b_id = 1;
    var a_no = 1;
    LDB.findOne({ b_id: b_id, a_no: a_no, type: data.dType }, function (err, result) {
        if (err) {
            res.send(JSON.stringify(err));
        }
        var point = new DataPoint(null, data.dData.map(e => e === 0 ? -100 : e), []);
        var values = result.data;
        var coordinates = result.relativeCoordinates;
        var dataSet = [];
        for (let i = 0; i < values.length; i++) {
            dataSet.push(new DataPoint(i, values[i], coordinates[i]));
        }
        var res_rssi = kNN(point, dataSet, 3);
        var { coordinate, results } = res_rssi;

        point = new DataPoint(null, null, coordinate);
        var candidates = candidateSet(point, dataSet, radius);
        data = locationData.find(e => e.dType == 'mag');
        var ids = candidates.map(v => { return v.id });
        LDB.findOne({ type: data.dType }, function (err, result) {
            if (err) {
                res.send(JSON.stringify(err));
            }
            point = new DataPoint(null, data.dData, []);
            values = result.data;
            coordinates = result.relativeCoordinates;
            dataSet = [];
            for (let i = 0; i < ids.length; i++) {
                dataSet.push(new DataPoint(ids[i], values[ids[i]], coordinates[ids[i]]));
            }
            var res_mag = kNN(point, dataSet, 3);
            var { coordinate, results } = res_mag;
            res.send(JSON.stringify(coordinate)); 

            global.io.emit('locate result', { "coordinate": coordinate, "session": req.session });

            log4js.configure({
                appenders: {
                    locate: { type: 'file', filename: './log/123.log' }
                },
                categories: { default: { appenders: ['locate'], level: 'trace' } }
            });
            const logger = log4js.getLogger('locate');
            logger.trace('-rq ' + JSON.stringify(req.body) + ' -rp ' + coordinate);


            log4js.configure({
                appenders: {
                    trace: { type: 'file', filename: './log/123.trace' }
                },
                categories: { default: { appenders: ['trace'], level: 'trace' } }
            });
            const tracer = log4js.getLogger('trace');
            var userId = '123';
            var bId = 1;
            var aNo = 2;
            tracer.trace('-id ' + userId + ' -t ' + req.body.timestamp + ' -bId ' + bId + ' -aNo ' + aNo + ' -Ux ' + coordinate[0] + ' -Uy ' + coordinate[1]);
        });

    });
}

module.exports = locate;
