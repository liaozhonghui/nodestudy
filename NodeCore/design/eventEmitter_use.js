/**
 * eventEmitter 使用方式
 * api: 
 * 1. on(event, listener)
 * 2. once(event, listener)
 * 3. emit(event, [arg1], ...)
 * 4. removeListener(event, listener);
 */

const EventEmitter = require('events').EventEmitter;
const fs = require('fs');

function findPattern (files, regex) {
    const emitter = new EventEmitter();
    files.forEach(function (file) {
        fs.readFile(file, 'utf8', (err, content) => {
            if (err) {
                return emitter.emit('error', err);
            }
            let match;
            if (match = content.match(regex)) {
                match.forEach(elem => emitter.emit('found', file, elem));
            }
        })
    });
    return emitter;
}

findPattern(
    []
)