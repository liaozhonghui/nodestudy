function bubbleSort(a, n) {
    // 冒泡排序
    for (let i = 0; i < n; i++) {
        let flag = false;
        for (let j = 0; j < n - 1 - i; j++) {
            if (a[j] > a[j + 1]) {
                let tmp = a[j];
                a[j] = a[j + 1];
                a[j + 1] = tmp;
                flag = true;
            }
        }
        if (!flag) break;
    }
    return a;
}