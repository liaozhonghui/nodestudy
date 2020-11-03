function maxSlidingWindow (a, k) {
    let res = []
    let queue = [];

    for (let i = 0; i < a.length; i++) {
        while (queue.length > 0 && a[i] >= queue[queue.length - 1]) {
            queue.pop();
        }
        queue.push(a[i]);
        let j = i + 1 - k;
        if (j >= 0) {
            res.push(queue[0]);
            if (a[j] === queue[0]) queue.shift();
        }
    }
    return res;
}
{
    let arr = [1, 3, -1, -3, -2, 5, 6, 5];
    let res = maxSlidingWindow(arr, 3);
    console.log('res:', res);
}