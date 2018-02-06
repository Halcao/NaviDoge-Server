var PFS = require('../model/schema/pfs.js');

const bssids = function(req, res) {
    PFS.find({pType: 'rssi'}, function(err, result) {
        if (err) {
            // FIXME: handle err
            res.send(JSON.stringify(err));
        }
        // flat array
        var bssids = [].concat.apply([], result.map(e => e.pBssids));
        res.send(JSON.stringify(bssids));
    });
}


module.exports = bssids;