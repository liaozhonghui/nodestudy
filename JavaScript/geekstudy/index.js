function test () {
    try {
        throw new Error('sb.');
        console.log('try');
    } catch(e) {
        console.log('catach:', e.message);
        return e.message;
    } finally {
        console.log('finally.');
        return 'finally';
    }
}
let res = test();
console.log('res:', res);