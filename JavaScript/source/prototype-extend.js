function myExtend(C, P) {
    var F = function() {};
    F.prototype = P.prototype;
    C.prototype = new F();
    C.prototype.constructor = C;
    C.super = P.prototype;
}

function P (name) {
    this.name = name;
}
P.prototype.getName = function () {
    return this.name;
}


class C1 extends P {
    constructor(age) {
        super('child1')
        this.age = age;
    }
}
function C (age) {
   
    this.age = age;
}
// myExtend(C, P);

let inst = new C(16);
console.log(inst);