// 动手实现reduce
Array.prototype.myReduce = function (callback, initialValue) {
    // array this进行了隐式绑定
    let arr = this;
    let accumulator = initialValue != null ? initialValue : arr[0];
    for (let i = initialValue != null ? 0 : 1; i < arr.length; i++) {
        accumulator = callback(accumulator, arr[i], i, arr);
    }
    return accumulator;
}

let arr = [1, 2, 3, 4, 5];
let sum = arr.myReduce((temp, v, k) => {
    temp *= v;
    return temp
}, 0);
console.log('sum:', sum);