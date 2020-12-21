/**
 * 实现对象拷贝
 */

function clone (target) {
    if (target && typeof target === 'object') {
        let res = {};
        for (let k in target) {
            res[k] = target[k];
        }
        return res;
    } else return target;
}



function deepClone (target, map = new WeakMap()) {
    if (typeof target !== 'object') {
        return target;
    } 
    let clone = Array.isArray(target) ? [] : {};
    // if (map.get(target)) { return target };
    // map.set(target, clone);
    for (let k in target) {
        let nk = toLowerCase(k);
        if (typeof target[k] === 'object') target[k] = deepClone(target[k], map);
        clone[nk] = target[k];
    }
    return clone;
}

function toLowerCase(str) {
    return str.toLowerCase();
}

/**
 * test cases
 */

let json = {
    A1: {
        B1: {
            C1: 1
        },
        B2: {
            C2: 2,
            C3: [{ D1: { E1: 1 }}, 2, 3, 4]
        }
    }
}


let res = deepClone(json);
console.log('source:', JSON.stringify(json));
console.log('target:', JSON.stringify(res));