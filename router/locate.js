var PFS = require('../model/schema/ldb.js');

const locate = function (req, res) {
    var result = [0, 0];
    locationData = [{ dData: [Number], dType: String }]
    var locationData = req.body.locationData;
    var dataNum = req.body.dataNum;
    var timestamp = req.body.timestamp;
    var dataTop = req.body.dataTop;
    var sn = req.body.sn;
    var coordinate = [0, 0];
    res.send(JSON.stringify(coordinate));
}

module.exports = locate;
