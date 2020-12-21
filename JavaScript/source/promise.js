/**
 * test cases
 */


var p1 = new Promise((resolve, reject) => {
    console.log('promise console');
    resolve('p data.');
})

console.log('normal console.');

var p2 = p1.then((data) => {
    console.log(data);
    throw new Error('p2 error');
})

var p3 = p2.then(data => {
    console.log('p2 data.');
}).catch(err => {
    console.log('catch p2 error:', err.message);
})

/**
 * realize 代码实现
 */
const PENDING = 'pending';
const FULLFILLED = 'fullfilled';
const REJECTED = 'rejected';
class myPromise {
    constructor(executor) {
        this.status = PENDING;
        this.value = null;
        this.reason = null;
        this.onFullfilledCb = [];
        this.onRejectedCb = [];
        // TODO: resolve, reject
        let resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULLFILLED;
                this.value = value;
                this.onFullfilledCb.forEach(fn => fn());
            }
        }
        let reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED;
                this.reason = reason;
                this.onRejectedCb.forEach(fn => fn());
            }
        }
        try {
            executor(resolve, reject);
        } catch (e) {
            reject(err);
        }
    }

    then (onFullfilled, onRejected) {
        /**
         * 处理值穿透
         */
        onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : v => v;
        onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err;}

        return new myPromise ((resolve, reject) => {
            if (this.status === FULLFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFullfilled(this.value);
                        resolvePromise(x);
                    } catch(e) {
                        reject(e);
                    }
                }, 0)
            } else if (this.stauts === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason);
                        resolvePromise(x);
                    } catch(e) {
                        reject(e);
                    }
                }, 0);
            } else if (this.status === PENDING) {
                if (onFullfilled) this.onFullfilledCb.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFullfilled(this.value);
                            resolvePromise(x);
                        } catch(e) {
                            reject(e);
                        }
                    }, 0)
                });
                if (onRejected) this.onRejectedCb.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason);
                            resolvePromise(x);
                        } catch(e) {
                            reject(e);
                        }
                    }, 0);
                });
            }
        })
    }
}