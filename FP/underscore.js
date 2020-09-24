/**
 * first
 */
const _ = require('underscore');

function first(array, n, guard) {
    if (array == null || array.length < 1) return n == null || guard ? void 0 : [];
    if (n == null || guard) return array[0];
    return initial(array, array.length - n);
}

function initial(array, n, guard) {
    return slice.call(array, 0, Math.max(0, array.length - (n == null || guard ? 1 : n)));
}

{
    let res = _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false]);
    console.log(res);
}
{
    let arr = _.map(_.range(10), function (v) { return v; })
    console.log('arr', arr);
    let chunkArr = _.chunk(arr, 2);
    console.log('chunkArr', chunkArr);
}

{
    var stooge = { name: 'moe' };
    let res = stooge === _.constant(stooge)();
    console.log('res', res);
}