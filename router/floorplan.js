var fs = require("fs");


const floorplan = function(req, res) {
    var filename = req.body.filename;
    var basePath = "";
    // 异步读取
    fs.readFile(basePath + filename, function (err, data) {
        if (err) {
            res.send(JSON.stringify(err));
            return
        }

        res.send(data.toString())
    });
 }


module.exports = floorplan;