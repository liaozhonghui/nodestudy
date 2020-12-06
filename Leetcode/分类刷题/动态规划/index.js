function dynamic_programming(weight, n, w) {
    // 初始化状态数组
    let states = [];
    for (let i = 0; i < n; i++) {
        states.push(new Array(w + 1));
    }
    states[0][0] = true;
    // 处理第一行的数据
    if (weight[0] < w) {
        states[0][]
    }
}