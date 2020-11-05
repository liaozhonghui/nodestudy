function bubbleSort(a, n) {
    if (n <= 1) return;
    for (let i = 0; i < n; i++) {
        let flag = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (a[j] > a[j + 1]) {
                let tmp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = tmp;
                flag = true;
            }
        }
        if (!flag) break;
    }
}
// 合并2个有序数组
function merge (nums1, m, nums2, n) {
    // 时间复杂度为O(m + n) 空间复杂度为O(m + n)
    let copy = nums1.slice(0, m);
    let i = 0, j = 0;
    while (i < m && j < n) {
        if (copy[i] <= nums2[j]) {
            nums1[i + j] = copy[i];
            i++;
        } else {
            nums1[i + j] = nums2[j];
            j++;
        }
    }
    if (i < m) {
        for (let k = i; k < m; k++) nums1[k + j] = copy[k];
    }
    if (j < n) {
        for (let k = j; k < n; k++) nums1[k + i] = nums2[j];
    }
}
// 合并2个有序数组
function merge (nums1, m, nums2, n) {
    // 时间复杂度为O(m + n) 空间复杂度为O(1)
    let tail = m + n - 1;
    let i = m - 1;
    let j = n - 1;
    while (i && j) {
        if (nums1[i] >= nums2[j]) nums1[tail--] = nums1[i--];
        else nums1[tail--] = nums2[j--];
    }
    if (j >= 0) {
        for (let k = j; k >= 0; k--) nums1[tail--] = nums2[k];
    }
}

{
    var lo = require('lodash')
    var arr = lo.range(10)
    var arr = lo.shuffle(arr);
    console.log('arr:', arr);
    bubbleSort(arr, 10);
    console.log('arr:', arr);
}

// 冒泡排序
function bubbleSort (arr) {
    let n = arr.length;
    if (n <= 1) return;
    for (let i = 0; i < n; i++) {
        let flag = false;
        for (let j = 0; j < n - 1 - i; j++) {
            if (a[j] > a[j + 1]) {
                [a[j], a[j + 1]] = [a[j + 1], a[j]];
                flag = true;
            }
        }
        if (!flag) break;
    }
}
// 选择排序
// 插入排序
function insertSort(arr) {
    let n = arr.length;
    if (n <= 1) return ;

    for (let i = 1; i < n; i++) {
        let val = a[i];
        for (let j = i - 1; j >= 0;) {
            if (a[j] > val) {
                a[j + 1] = val;
                j--;
            } else break;
        }
        a[j + 1] = val;
    }
}
// 快速排序
function quick_sort (arr) {
    
}
// 桶排序
// 计数排序
// 基数排序