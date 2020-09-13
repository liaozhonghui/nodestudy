var  _ = require('underscore');

let res;
res = _.max([1,2,3,4,5])

function finder(valueFun, bestFun, coll) {
    return _.reduce(coll, function(best, current) {
        var bestValue = valueFun(best);
        var currentValue = valueFun(current);
        return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
    })
}

res = finder(_.identity, Math.max, [1, 2, 3, 4, 5]);

console.log(res);