function testCatch() {
    try {
        var a = {};
        console.log(a.b.c);
    } catch (e) {
        console.log('捕捉到了异常2.')
    }
}

function main () {
    try {
        testCatch();
    } catch (e) {
        console.log('捕捉到了异常1.')
    }
}

// main();
testCatch();