/**
 * 用数组实现一个队列
 * 普通顺序队列
 */
function ArrayQueue(capacity = 0) {
    this.items = []
    this.n = capacity;
    this.head = 0;
    this.tail = 0;
}
ArrayQueue.prototype.enqueue = function (item) {
    if (this.tail === this.n) {
        if (this.head === 0) return false;
        for (let i = this.head; i < this.tail; i++) {
            this.items[i - head] = this.items[i];
        }
        this.head = 0;
        this.tail = this.tail - this.head;

    }
    this.items[this.tail] = item;
    this.tail++;
    return true
}
ArrayQueue.prototype.dequeue = function () {
    if (this.head === this.tail) return null;
    let item = this.items[this.head];
    this.head++;
    return item;
}

/**
 * 数组循环队列
 * 边界条件： 队列为空 head == tail
 * 队列为满 (tail+1)%n == head
 */
function CircularQueue(capacity = 0) {
    this.items = [];
    this.n = capacity;
    this.head = 0;
    this.tail = 0;
}
CircularQueue.prototype.enqueue = function(item) {
    if (this.n === 0) return false;
    if ((this.tail + 1) % this.n === this.head) return false;
    this.items[this.tail] = item;
    this.tail = (this.tail + 1) % this.n;
    return true;
}
CircularQueue.prototype.dequeue = function() {
    if (this.head === this.tail) return null;
    let item = this.items[this.head];
    this.head = (this.head + 1) % this.n;
    return item;
}