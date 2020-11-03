/**
 * 数组代码
 */
// 两数之和
function twoSum(nums, target) {
    if (!nums || nums.length < 2) return [];
    let m = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (m[target - nums[i]]) {
            return [m[target - nums[i]] - 1, i];
        } else {
            m[nums[i]] = i + 1;
        }
    }
}

// 爬楼梯
function climbStairs(n) {
    if (n === 1) return 1;
    if (n === 2) return 2;
    let a1 = 1, a2 = 2;
    for (let i = 3; i <= n; i++) {
        let tmp = a2;
        a2 += a1;
        a1 = tmp;
    }
    return a2;
}

// 盛水最多的容器
function maxArea(height) {
    let res = 0, i = 0, j = height.length - 1;
    while(i < j) {
        let h = Math.min(height[i], height[j]);
        res = Math.max(res, h * (j - i));
        while(i < j && height[i] <= h) i++;
        while(i < j && height[j] <= h) j--;
    }
    return res;
}
// 移动零
function moveZeroes(nums) {
    let index = 0;
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== 0) {
            if (i === index) {
                nums[index] = nums[i];
                nums[i] = 0;
            }
            index++;
        }
    }
    return nums;
}

// 三数之和
function threeSum (nums, target = 0) {
    let res = [];
    if (nums.lenght < 3) return res;
    // sort o(nlogn)
    nums.sort((a, b) => a - b);
    
    // o(n^2)
    for (let i = 0; i < nums.length - 2; i++) {
        if (nums[i] > target) break;
        if (i > 0 && nums[i] === nums[i - 1]) continue;
        let j = i + 1;
        let k = nums.length - 1;
        while (j < k) {
            let sum = nums[i] + nums[j] + nums[k];
            if (sum - target === 0) {
                res.push([nums[i], nums[j], nums[k]]);
                // remove duplicated 
                while (j + 1 < k && nums[j + 1] === nums[j]) j++;
                while (j + 1 < k && nums[k - 1] === nums[k]) k--;
                j++;
                k--;
            } else if (sum - target > 0) k--;
            else if (sum - target < 0) j++;
            else return []; // NAN
        }
    }
    return res;
}


