var counter = 0;
function incr (increment) {
    counter += increment || 0;
}
module.exports = {
    counter,
    incr
}