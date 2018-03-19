var Building = require('../model/schema/building.js');
var PFS = require('../model/schema/pfs');
const log4js= require('log4js');
var example = `
{
    "building": {
        "address": "天津市津南区海河教育园区雅观路135号",
        "geographicLocation": [
            39.0057055878,
            117.3206219345
        ],
        "name": "55教学楼",
        "id": 1
    },
    "area": {
        "name": "五层",
        "relativeCoordinate": [
            0,
            0
        ],
        "size": [
            113.38,
            19.18
        ],
        "floor": 5,
        "altitude": 25,
        "no": 2
    },
    "locateEngineConf": {
        "Method": "RADAR",
        "K": 3
    },
    "floorplan": "55_5.svg",
    "timestamp": 176435086,
    "bssids": [
        "00:1d:0f:92:b6:e4",
        "00:1d:7e:cb:75:74",
        "00:24:b2:5d:98:ef",
        "00:36:76:6b:fe:f6",
        "00:36:76:6e:16:a2",
        "00:c0:02:12:35:88",
        "14:3d:f2:b9:d5:00",
        "14:3d:f2:b9:d5:03",
        "14:5f:94:bc:4b:59",
        "14:75:90:80:7b:aa",
        "14:75:90:a4:1a:10",
        "18:4f:32:9a:06:6f",
        "20:e5:2a:35:0f:4a",
        "24:05:0f:a6:98:83",
        "24:05:0f:a7:79:3b",
        "28:2c:b2:ca:98:c4",
        "28:6c:07:96:9c:2e",
        "28:c6:8e:d6:46:d6",
        "34:80:b3:78:2b:0e",
        "34:96:72:1c:5e:08",
        "40:b8:9a:47:83:5b",
        "42:49:0f:06:4e:51",
        "48:7d:2e:4b:1f:0c",
        "48:7d:2e:4b:1f:0e",
        "48:8a:d2:1c:4f:0d",
        "54:e6:fc:63:bc:ba",
        "5a:fb:84:2f:e2:f2",
        "5c:63:bf:cd:60:fe",
        "70:ba:ef:c5:c3:80",
        "70:ba:ef:c5:c3:90",
        "70:ba:ef:c6:03:e0",
        "70:ba:ef:c6:03:f0",
        "70:ba:ef:c6:19:60",
        "70:ba:ef:c6:19:70",
        "70:ba:ef:c6:9f:a0",
        "70:ba:ef:c6:9f:b0",
        "70:ba:ef:c6:a6:00",
        "70:ba:ef:c6:a6:10",
        "70:ba:ef:c6:ab:e0",
        "70:ba:ef:c6:ab:f0",
        "70:ba:ef:c6:b3:c0",
        "70:ba:ef:c6:b8:20",
        "70:ba:ef:c6:b8:30",
        "70:ba:ef:c6:b8:b0",
        "70:ba:ef:cb:75:90",
        "70:ba:ef:cb:82:20",
        "70:ba:ef:cb:82:30",
        "70:ba:ef:cb:83:f0",
        "70:ba:ef:cb:c1:80",
        "70:ba:ef:cb:c1:90",
        "70:ba:ef:cb:d9:c0",
        "70:ba:ef:cb:d9:d0",
        "70:ba:ef:cb:e4:f0",
        "70:ba:ef:cb:e8:40",
        "70:ba:ef:cb:e8:50",
        "74:44:01:54:9e:4c",
        "7a:a5:1b:7a:b2:50",
        "80:89:17:62:5e:ee",
        "84:1b:5e:e3:b5:ff",
        "84:1b:5e:e3:b6:00",
        "84:1b:5e:ee:bf:32",
        "8c:a6:df:7e:5a:7f",
        "92:cd:b6:5b:1e:8f",
        "9c:3d:cf:14:26:21",
        "9c:3d:cf:14:26:22",
        "9c:3d:cf:14:26:23",
        "a0:21:b7:71:30:5c",
        "ac:18:26:7f:a5:33",
        "b0:7f:b9:7f:48:53",
        "b0:7f:b9:7f:48:54",
        "b0:d5:9d:8c:99:ec",
        "bc:3a:ea:24:ef:70",
        "bc:46:99:24:a9:2e",
        "bc:46:99:df:4a:eb",
        "bc:46:99:df:4a:ed",
        "c4:36:55:45:f3:19",
        "c8:3a:35:26:50:18",
        "d0:c7:c0:d0:d3:68",
        "d0:ee:07:22:02:a0",
        "d4:6a:6a:50:97:6f",
        "d4:ee:07:22:02:a0",
        "d8:c8:e9:21:2d:90",
        "d8:c8:e9:21:2d:98",
        "da:0f:99:20:e1:4f",
        "e0:05:c5:26:3d:86",
        "ec:26:ca:13:7f:0a",
        "ec:88:8f:8a:f6:3a",
        "f0:b4:29:24:e1:01",
        "f8:d1:11:e6:b4:3c",
        "fc:d7:33:dc:4d:3e"
    ]
}
`;
const initial = function (req, res) {
    // TODO: get building
    //res.send(example);
    //return;
    var bssids = req.body.bssids;
    var geographicLocation = req.body.geographicLocation;
    var timestamp = req.body.timestamp;
    PFS.find({ pType: 'rssi' }, function (err, result) {
        if (err) {
            var result = {
                error_code: 1,
                error_message: err
            }
            res.send(JSON.stringify(result));
        }

        console.log(result.length);
        var similarity = 0;
        var pfs;
        var bId = 1, aNo = 2;
        for (pfs of result) {
            let sim = getSimilarity(bssids, pfs.pBssids);
            if (sim > similarity) {
                similarity = sim;
                // bId=pfs.bId;
                // aNo=pfs.aNo;
            }
        }
        getResponse(req, res, bId, aNo, pfs);
    });
}

function getSimilarity(b1, b2) {
    var s = 0;
    for (let b of b1) {
        if (b2.indexOf(b) != -1) {
            s = s + 1;
        }
    }
    return s / b1.length;
}

function getResponse(req, res, bId, aNo, pfs) {
    Building.findOne({ id: bId }, function (err, result) {
        var response = {};
        response.building = {
            address: result.address,
            geographicLocation: result.geographicLocation,
            name: result.name,
            id: bId
        }
        area = result.Areas.find(function (x) { return x.no == aNo });
        response.area = {
            name: area.name,
            relativeCoordinate: area.relativeCoordinate,
            size: area.size,
            floor: area.floor,
            altitude: area.altitude,
            no: aNo
        }
        response.locateEngineConf = result.locateEngineConf;
        response.floorplan = result.floorplan;
        response.bssids = pfs.bssids;
        res.send(response);
        log4js.configure({
            appenders:{initial :{type :'file',filename:'./log/123.log'}},
            categories:{default:{appenders:['initial'],level:'trace'}}
        });
        const logger= log4js.getLogger('inital');
        logger.trace('-rq '+JSON.stringify(req.body)+' -rp '+JSON.stringify(response));
    });
}

module.exports = initial;

