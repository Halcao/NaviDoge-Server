/**
 * 
 * @param {DataPoint} data 
 * @param {[DataPoint]} dataSet 
 * @param {Number} k 
 * 
 var point = {type: 'unknown', values: [1, 2, 3]};

dataPoint = new DataPoint(point.values, point.type);

var points = [
    {type: 'mag', values: [1, 2, 3.1]}, 
    {type: 'other', values: [21, 2, 3.1]}, 
    {type: 'rssi', values: [1, 2, 3]},
    {type: 'mag', values: [15.2, 2, 3]},
    {type: 'rssi', values: [1.3, 2, 3]},
    {type: 'mag', values: [1, 212, 0]}
];
var set = points.map(e => new DataPoint(e.values, e.type));

console.log(kNN(dataPoint, set, 3));
 */
class DataPoint {
    constructor(id, values, category) {
        this.id = id;
        this.values = values;
        this.category = category;
    }

    feature_distance(other) {
        var distance = 0;
        for (var i = 0; i < this.values.length; i++) {
            let tmp = this.values[i] - other.values[i];
            distance += tmp * tmp;
        }
        return Math.sqrt(distance);
    }

    physical_distance(other) {
        var distance = 0;
        for (var i = 0; i < this.category.length; i++) {
            let tmp = this.category[i] - other.category[i];
            distance += tmp * tmp;
        }
        return Math.sqrt(distance);
    }
}

function kNN(data, dataSet, k) {

    var results = [];
    var distances=[];
    for (let point of dataSet) {
        let distance = data.feature_distance(point);
        results.push(point);
        distances.push(distance);
    }

    results.sort((a, b) => a.distance - b.distance);

    //var map = {};
    var x = 0;
    var y = 0;
    for (let point of results.slice(0,k)) {
        //map[point.category] = (map[point.category] || 0) + 1;
        x += point.category[0];
        y += point.category[1];
    }

    x /= k;
    y /= k;
    return {
        coordinate: [x, y],
        results: results.slice(0,k),
        distances: distances
    };
}

module.exports.kNN = kNN;
module.exports.DataPoint = DataPoint;