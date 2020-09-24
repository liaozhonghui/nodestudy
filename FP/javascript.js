var _ = require('underscore');

function finder(valueFun, bestFun, coll) {
    return _.reduce(coll, function (best, current) {
        var bestValue = valueFun(best);
        var currentValue = valueFun(current);
        return (bestValue === bestFun(bestValue, currentValue)) ? best : current;
    })
}

let people = [{ name: 'fred', age: 65 }, { name: 'lucy', age: 36 }, { name: 'alpha', age: 40 }, { name: 'beta', age: 37 }];
let arr = [2, 1, 4, 3, 5];
{
    let res = _.max([1, 2, 3, 4, 5]);
    console.log('res', res);
}
{
    let res = finder(_.identity, Math.max, arr);
    console.log('res', res);
}
{
    function plucker(FIELD) {
        return function (obj) {
            return (obj && obj[FIELD]);
        }
    }
    let res = finder(plucker('age'), Math.max, people);
    console.log('res', res);
    {
        function findL(x, y) {
            return (x.charAt(0) === 'l' ? x : y);
        }
        let res = finder(plucker('name'), findL, people);
        console.log('res', res);
    }
}
{
    function best(fun, coll) {
        return _.reduce(coll, function (x, y) {
            return fun(x, y) ? x : y;
        })
    }
    {
        let res = best(function (x, y) { return x > y; }, arr);
        console.log('res', res);
    }
}

{
    // 重复，反复和条件迭代
    function repeat(times, VALUE) {
        return _.map(_.range(times), function () { return VALUE; })
    }
    {
        let res = repeat(4, 'Major');
        console.log('res', res);
    }
    function repeatly(times, fun) {
        return _.map(_.range(times), fun);
    }
    {
        let res = repeatly(3, function () { return Math.floor((Math.random() * 10) + 1) });
        console.log('res', res);
    }
    function iterateUntil(fun, check, init) {
        var ret = [];
        var result = fun(init);

        while (check(result)) {
            ret.push(result);
            result = fun(result);
        }
        return ret;
    }
    {
        let res = iterateUntil(function (n) { return n + n; }, function (n) { return n <= 1024 }, 1);
        console.log('res', res);
    }
}