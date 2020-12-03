var foo = require('./lib/foo');

console.log('counter:', foo.counter);
foo.incr(3);
console.log('counter:', foo.counter);