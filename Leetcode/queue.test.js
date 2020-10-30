function ArrayQueue (capacity = 0) {
    this.items = [];
    this.n = capacity;
    this.head = 0;
    this.tail = 0;
}
ArrayQueue.prototype.enqueue = function(item) {
    if (this.tail === this.n) {
        return false;
    }
    this.items.push(item);
    this.tail++;
    return true;
}
ArrayQueue.prototype.dequeue = function () {
    if (this.head === this.tail) return null
    let item = this.items[this.head];
    this.head++;
    return item;
}

{
    // 测试普通数组队列
    var arrayQueue = new ArrayQueue(2);
    console.log('put 1:', arrayQueue.enqueue(1) ? 'true' : 'false');
    console.log('put 2:', arrayQueue.enqueue(2) ? 'true' : 'false');
    console.log('put 3:', arrayQueue.enqueue(3) ? 'true' : 'false');
    let item = arrayQueue.dequeue();
    console.log('item:', item);
}