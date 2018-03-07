var Area = require('../model/schema/area.js');

var area = function(req, res) {
    Area.find(function(err, result) {
        if (err) {
            // FIXME: handle err
            res.send(JSON.stringify(err));
        }
        res.send(JSON.stringify(result));
        console.log(res);
    });
}


module.exports = area;