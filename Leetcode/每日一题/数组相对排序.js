/**
 * 数组相对排序
 */
function relativeSortArray(arr1, arr2) {
    if (!arr2 || arr2.length === 0) return arr1.sort((a, b) => a - b);
    let m = arr2.reduce((obj, v, index) => {
        obj[v] = index + 1;
        return obj;
    }, new Map());
    arr1.sort((a, b) => {
        if (m[a] && m[b]) return m[a] - m[b];
        else if (m[a]) return -1;
        else if (m[b]) return 1;
        else return a - b;
    });
    return arr1;
}

{
    let assert = require('assert');
    let arr1 = [2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19];
    let arr2 = [2, 1, 4, 3, 9, 6];
    relativeSortArray(arr1, arr2);
    let res = [2, 2, 2, 1, 4, 3, 3, 9, 6, 7, 19]
    for (let i = 0; i < arr1.length; i++) {
        assert.equal(arr1[i], res[i], `第${i}个元素不相等`);
    }
}