/**
 * 
 * @param {DataPoint} data 
 * @param {[DataPoint]} dataSet 
 * @param {Number} radius 
 * 
 * This is a function for select candidate point.
 */

var DataPoint = require('../model//kNN').DataPoint;

function candidate(data,dataSet,radius){
    var results = [];
    for (var point of dataSet) {
        var distance = data.physical_distance(point);
        if (distance<=radius){
            results.push({
                point: point,
                distance: distance
            });
        }
    }
    return results;
}
