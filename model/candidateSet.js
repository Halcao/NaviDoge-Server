/**
 * 
 * @param {DataPoint} data 
 * @param {[DataPoint]} dataSet 
 * @param {Number} radius 
 * 
 * This is a function for select candidate point.
 */

function candidateSet(data,dataSet,radius){
    var results = [];
    for (var point of dataSet) {
        var distance = data.physical_distance(point);
        if (distance<=radius){
            results.push({
                id: point.id,
                distance: distance
            });
        }
    }
    return results;
}


module.exports = candidateSet;