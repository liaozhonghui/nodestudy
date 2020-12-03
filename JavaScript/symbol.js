let obj = {
    [Symbol('haha')] : 1,
    enum: 2,
    nonEnum: 3
}
console.log(Reflect.ownKeys(obj));

var s = Symbol.for(obj);

let k = Symbol.keyFor(s);

console.log(k.nonEnum);
console.log( obj=== k ? 'true' : 'false');