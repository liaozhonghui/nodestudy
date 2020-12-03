// 实现一个call函数
/**
 * 使用隐式绑定实现,
 * 使用apply的时候，注意传参参数数组的长度问题
 */
Function.prototype.myCall = function (context) {
    context = context || window
    context.fn = this;
    let args = Array.prototype.slice.call(arguments, 1);
    let result = context.fn(...args);
    delete context.fn
    return result;
}
Function.prototype.myApply = function(context) {
    context = context || window;
    context.fn = this;
    let result;
    let args = arguments[1];
    if (args) {
        result = context.fn(...args);
    } else {
        resule = context.fn();
    }
    delete context.fn;
    return result;
}
// test case
var obj = {
    a: 1,
}
function foo() {
    console.log(this.a);
}
foo.call(obj, 1, 2, 3, 4);