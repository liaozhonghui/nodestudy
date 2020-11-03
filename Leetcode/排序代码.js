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


{
    var lo = require('lodash')
    var arr = lo.range(10)
    var arr = lo.shuffle(arr);
    console.log('arr:', arr);
    bubbleSort(arr, 10);
    console.log('arr:', arr);
}