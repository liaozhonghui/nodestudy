var ladderLength = function(beginWord, endWord, wordList) { 
    // 单向bfs广度优先搜索
    let wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    if (!beginWord || !endWord) return 0;
    let visited = new Set();
    let queue = [beginWord];
    let step = 1;
    while (queue.length) {
        let next = [];
        for (let word of queue) {
            if (word === endWord) return step;
            let array = word.split('');
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < 26; j++) {
                    array[i] = String.fromCharCode(97 + j);
                    let newWord = array.join('');
                    if (!visited.has(newWord) && wordList.has(newWord)) {
                        next.push(newWord);
                        visited.add(newWord);
                    }
                    array[i] = word[i];
                }
            }
        }
        queue = next;
        step++;
    }
    return 0;
};

var ladderLength = function(beginWord, endWord, wordList) {
    // 双向bfs广度优先搜索
    let wordSet = new Set(wordList);
    if (!wordSet.has(endWord)) return 0;
    let beginSet = new Set([beginWord]);
    let endSet = new Set([endWord]);
    let step = 1;
    while (beginSet.size) {
        let nextSet = new Set();
        for (let word of beginSet) {
            let array = word.split('');
            for (let i = 0; i < array.length; i++) {
                for (let j = 0; j < 26; j++) {
                    array[i] = String.fromCharCode(97 + j);
                    let newWord = array.join('');
                    if (endSet.has(newWord)) return step + 1;
                    if (wordSet.has(newWord)) {
                        nextSet.add(newWord);
                        wordSet.delete(newWord);
                    }
                    array[i] = word[i];
                }
            }
        }
        step++;
        beginSet = nextSet;
        if (beginSet.size > endSet.size) [beginSet, endSet] = [endSet, beginSet];
    }
    return 0;
}





// bfs代码模板
function bfs(root) {
    let queue = [root];
    let visited = new Set();
    while (queue.length) {
        let next = [];
        
        for (let node of queue) {
            if (visited.has(node)) continue;
            // deal logic;
            // process(node);
            visited.add(node);
            let nodes = generate(node);
            next = [].concat(nodes);
        }
        queue = next;
    }
}