// var PFS = require('../model/schema/pfs.js');

const locate = function(req, res) {
    var result = [0, 0];
    res.send(JSON.stringify(result));
    // locationData = [ { dData: [Number], dType: String }]
    // var locationData = req.body.locationData;
    // var dataNum = req.body.dataNum;
    // var timestamp = req.body.timestamp;
    // var dataTop = req.body.dataTop;
    // var sn = req.body.sn;
    // PFS.find({pType: 'rssi'}, function(err, result) {
    //     if (err) {
    //         res.send(JSON.stringify(err));
    //     }
    //     var result = [0, 0];
    // });
}

module.exports = locate;
