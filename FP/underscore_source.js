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
{

    var throttled = _.throttle(() => console.log('ha'),5000) ;
    let timeInterval = setInterval(() => {
        throttled()
    },5);
    setTimeout(() => {
        clearInterval(timeInterval);
    }, 5000);
}
{
    var debounced = _.debounce(() => console.log('he'), 100);
    debounced()
    setTimeout(() => {
        debounced();
    }, 200);
}
{
    var initialize = _.once(() => console.log('once exec'));
    initialize();
    initialize();
    initialize();
    initialize();
}
{
    function render(item) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('item:', item);
                resolve();
            }, 1000)
        })
    }
    let notes = _.range(3);
    var afterFun = _.after(notes.length, render);
    _.each(notes, function (item) {
        afterFun(item);
    });
    let afterFunSync = _.after(notes.length, () => console.log('hahahha'));
    _.each(notes, note => {
        afterFunSync(note);
    })
}
{
    var raceRes = _.restArguments(function (a, b, c, rest) {
        console.log('rest', rest);
    })
    raceRes(1, 2, 3, 4, 5, 6);
}
{
    // test undefined
    {
        function a () {
            var undefined = 123;
            return undefined;
        }
        console.log('test undefined1:', a());
        var undefined = 'hahahahahhahahah';
        console.log('test undefined2:', undefined);
    }
}
{
    // test local scope
    {
        let i = 12;
        for (let i = 0; i < 2; i++) {
            console.log('test local scope: ', i);
        }
    }
}
{
    // test let of
    let arr = _.rest(_.range(3+1));
    for (let i of arr) {
        console.log('test let of:', i);
    }
}

{
    // prototype设置
    function foo () {

    }
}
{
    var arr = _.range(4).map(o => ({a: 1, b: 2, c: 3})) ;
    var ready = _.matcher({a:1, b:2});
    var list = _.filter(arr, ready);
    console.log('test underscore, matcher function,', list)
}