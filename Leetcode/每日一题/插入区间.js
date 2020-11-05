// 时间复杂度为O(n), 空间复杂度为O(n)
function insert (intervals, newInterval) {
    if (!newInterval || newInterval.length < 2) return intervals;
    let res = [];
    let left = newInterval[0];
    let right = newInterval[1];
    let placed = false;
    for (let i = 0; i < intervals.length; i++) {
        let interval = intervals[i];
        if (interval[0] > left) {
            // 区间在新区间右侧
            if (!placed) {
                res.push([left, right]);
                placed = true;
            }
            res.push(interval);
        } else if (interval[1] < right) {
            // 区间在新区建左侧
            res.push(interval);
        } else {
            // 合并成为一个新的大区间
            left = Math.min(left, interval[0]);
            right = Math.max(right, interval[1]);
        }
    }
    if (!placed) res.push([left, right]);
    return res;
}