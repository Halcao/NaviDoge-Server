var PFS = require('../model/schema/pfs.js');

const bssids = function(req, res) {
    // const aid = req.body.a_id;
    PFS.find({pType: 'rssi'}, function(err, result) {
        if (err) {
            // FIXME: handle err
            res.send(JSON.stringify(err));
        }
        // flat array
        var bssids = [].concat.apply([], result.map(e => e.pBssids));
        // console.log("bssids out "+bssids.length);
        //var result = {"a_id": aid, "bssdis": JSON.stringify(bssids)};
        // res.send(JSON.stringify(bssids));
        res.send(JSON.stringify(bssids));
    });
}

module.exports = bssids;
