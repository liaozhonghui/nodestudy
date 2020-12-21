function throttle(fn, delay) {
    let prevTime = Date.now();
    return function () {
        let curTime = Date.now();
        if (curTime - prevTime > delay) {
            fn.apply(this, argument);
            prevTime = curTime;
        }
    }
}

var throttleScroll = throttle(function () {
    console.log('throttle');
}, 1000);

window.onscroll = throtteScroll;