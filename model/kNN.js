/**
 * kNN prototype
 * @param {*} data data to classify
 * @param {[*]} dataSet data array
 * @param {function(a, b)} distance custom distance function
 */
function kNN_deprecated(data, dataSet, k, distance) {
    //
    distance = distance || function(a, b){
        return Math.sqrt((a-b)*(a-b));
    }
    var distances = []
    for (var item of dataSet) {
        var length = distance(item.value, data.value);
        distances.push({
            item: item,
            length: length
        });
    }
    distances.sort(function(a, b) {
        return b.length - a.length;
    });
    
    var items = [];
    for (var item of distances) {
        if (items.find(function(e) {
            return e.type = item.type;
        }) == "undefined") {
            item.count = 0;
            items.push(item);
        } else {
            item.count++ ;
        }
    }

    items.sort(function(a, b) {
        return a.count - b.count;
    });
    return items[0].type;
}

// function _distance(a, b) {
//     var length = 0;
//     length += 
// }

class DataPoint {
    constructor(values, category) {
        this.values = values;
        this.category = category;
    }

    distance(other) {
        var distance = 0;
        for (var i = 0; i < this.values.length; i++) {
            let tmp = this.values[i] - other.values[i];
            distance += tmp * tmp;
        }
        return Math.sqrt(distance);
    }
}

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
function kNN(data, dataSet, k) {
    
    var results = [];
    for (var point of dataSet) {
        var distance = data.distance(point);
        results.push({
            point: point,
            distance: distance
        });
    }

    results.sort((a, b) => a.distance - b.distance);

    var map = {};
    var x = 0;
    var y = 0;
    for (var i = 0; i < k && i < results.length; i++) {
        var item = results[i];
        map[item.point.category] = (map[item.point.category] || 0) + 1
        x += item.point.category[0];
        y += item.point.category[1];
    }

    x /= k;
    y /= k;
    return [x, y];
    // var maxItem = ['none', 0];
    // for (var key in map) {
    //     var count = map[key];
    //     if (count > maxItem[1]) {
    //         maxItem[0] = key;
    //         maxItem[1] = count;
    //     }
    // }
    // return maxItem[0];


}

module.exports.kNN = kNN;
module.exports.DataPoint = DataPoint;