var fs = require("fs");


const floorplan = function(req, res) {
    //var filename = req.body.filename;
    var filename = "55_5.svg";
    //var basePath = "/home/noil/NaviDoge-Server-master/resources/";
    var path=require("path");
    var basePath=path.resolve(__dirname,"..")+"/resources/";
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
