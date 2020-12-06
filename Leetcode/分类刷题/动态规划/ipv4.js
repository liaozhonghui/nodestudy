function ipv4ToInt(s) {
    // 转化s
    let arr = s.split('.').map(v => parseInt(v.trim())).filter(v => v >= 0);
    if (arr.length < 4) return 0;
    let res = (arr[0] << 24) + (arr[1] << 16) + (arr[2] << 8) + arr[3];
    return res;
}
var ipv4 = '10.10.0.1';
console.log('res:', ipv4ToInt(ipv4));