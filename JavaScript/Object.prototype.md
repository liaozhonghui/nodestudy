对象原型使用
Object.prototype.toString.call()方法可以用来判断变量的数据类型

Object.prototype.toString.call(333);          // [object Number]
Object.prototype.toString.call("aaa");        // [object String]
Object.prototype.toString.call(true);         // [object Boolean]
Object.prototype.toString.call([]);           // [object Array]
Object.prototype.toString.call(function(){}); // [object Function]
Object.prototype.toString.call({});           // [object Object]
Object.prototype.toString.call(undefined);    // [object Undefined]
Object.prototype.toString.call(null);         // [object Null]


Object.prototype.toString.call(new Date);     // [object Date]
Object.prototype.toString.call(new String);   // [object String]
Object.prototype.toString.call(Math);         // [object Math]
