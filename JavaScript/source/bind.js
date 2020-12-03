// 实现bind函数
Function.prototype.myBind = function () {
    let context = arguments[0] || window;
    let _this = this;
    let args = Array.prototype.slice.call(arguments, 1);
    return function F() {
        let args2 = Array.prototype.slice.call(arguments);
        if (this instanceof F) {
            // 说明使用了new进行创建实例
            return new _this(...args2)
        } else {
            // 说明使用bind进行了绑定
            let rest = args.concat(args2);
            if (rest.length > 0)_this.apply(context, rest);
            else _this.apply(context);
        }
    }
}

function Person() {
    this.age = 1;
    this.gender = 'male'
}
let obj = {
    name: 'a'
}
let changePerson = Person.myBind(obj);

changePerson()

console.log('obj:', JSON.stringify(obj));
let p = new changePerson();
console.log('p:', JSON.stringify(p));