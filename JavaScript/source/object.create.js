// 实现object.create方法
function create (o) {
    var F = function () {}
    F.prototype = o;
    return new F();
}