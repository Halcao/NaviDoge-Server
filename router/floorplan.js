var fs = require("fs");
const log4js= require('log4js');

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
        log4js.configure({
            appenders:{floorplan :{type :'file',filename:'./log/123.log'}},
            categories:{default:{appenders:['floorplan'],level:'trace'}}
        });
        const logger= log4js.getLogger('floorplan');
        logger.trace('-rq '+JSON.stringify(req.body));
    });
 }

module.exports = floorplan;
