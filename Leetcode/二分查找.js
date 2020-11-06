/**
 * 
二分查找思想：
时间复杂度为O(logn), 堆的操作复杂度和二叉树的操作时间复杂度都是O(logn);

简单的二分查找，复杂的二分查找的变体
 */

//  二分查找的递归实现

// 二分查找的非递归实现
var bsearch = function (nums, value) {
    var low = 0;
    var high = nums.length - 1;
    while (low <= high) {
        let mid = low + (high - low) >> 1;
        if (nums[mid] === value) return mid;
        else if (nums[mid] < value) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }
    return -1;
}