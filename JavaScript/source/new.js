// 实现new调用操作
/**
 * 1. 创建一个空对象
 * 2. 将新对象的原型链接到目标对象上
 * 3. 将创建的对象绑定到this上下文
 * 4. 如果函数没有返回值，则返回该对象
 */

 function create(fn, ...args) {
    this.obj = {};
    Object.setPrototypeOf(obj, fn.prototype);
    let result = fn.apply(this.obj, args);

    return result instanceof Object ? result : this.obj;
 }