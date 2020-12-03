class Event {
    constructor () {
        this._cache = new Map();
    }
    on (type, callback) {
        let cbSet = this._cache.get(type);
        if (cbSet) {
            cbSet.add(callback);
        } else {
            this._cache.set(type, new Set([callback]));
        }
        return this;
    }
    remove (type, callback) {
        let cbSet = this._cache.get(type);
        if (cbSet &&cbSet.has(type)) {
            cbSet.delete(callback);
        } else {
            // 全部清空
            cbSet.clear()
        }
        return this;
    }
    emit (type, ...args) {
        let cbSet = this._cache.get(type);
        if (cbSet && cbSet.size > 0) {
            for (let callback of cbSet.values()) {
                callback.call(null, ...args);
            }
        }
    }
    once (type, callback) {
        let wrapFn = (...args) => {
            callback.call(null, ...args);
            this.remove(type, callback);
        }
        this.on(type, wrapFn);
        return this;
    }
}

var event = new Event();
var callback = function (...args) {
    console.log('触发了事件, params:', args);
}
event.on('data', callback);

event.emit('data', 1, 2, 3, 4);
event.remove('data', callback);
event.once('sql', callback)
event.emit('sql', 1, 2, 1);
event.emit('sql', 2, 2, 1);
event.emit('data', 2, 2, 3, 4);