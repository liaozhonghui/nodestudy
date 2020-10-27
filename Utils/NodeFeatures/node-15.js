/**
 * AbortController
 */

const ac = new AbortController()

ac.signal.addEventListener('abort', () => {
    console.log('ac aborted.')
})
ac.abort()

console.log(ac.signal.aborted);