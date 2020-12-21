/**
 * 防抖
 */

function debounce(func, wait) {
    let timeout;
    return function() {
        let context = this;
        let args = arguments;
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            func.apply(context, args);
        })
    }
}

window.onscroll = debounce(function () {
    console.log('debounce');
}, 1000);