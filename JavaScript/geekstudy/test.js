// 集合数据遍历

let nums = [1, 2, 3, 4, 5, 1, 2, 5];
let m = nums.reduce((obj, v, index) => {
    if (obj.has(v)) obj.set(v, obj.get(v) + 1);
    else obj.set(v, 1);
    return obj;
}, new Map());
console.log(`size: ${m.size}`)