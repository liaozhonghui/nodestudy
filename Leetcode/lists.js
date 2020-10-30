/**
 * 判断是否是回文链表
 */
let lo = require('lodash');
function ListNode (val) {
    this.val = val;
    this.next = null;
}
/**
 * 判断链表是否是回文链表
 */
function isPalindrome(head) {
    if (!head && !head.next) return true;

    let prev = null;
    let slow = head;
    let quick = head;

    while (quick && quick.next) {
        quick = quick.next.next;
        // prev节点逆转
        let node = slow.next;
        slow.next = prev;
        prev = slow;
        slow = node;
    }
    if (quick) {
        slow = slow.next;
    }
    while (slow) {
        if (slow.val !== prev.val) return false;
        slow = slow.next;
        prev = prev.next;
    }
    return true;
}
{
    let str = 'abcdecba';
    let nodeArr = (new Array(str.length || 0).fill(0)) || (lo.range(str.length || 0));
    let nodes = nodeArr
        .map((v, index) => {
            let obj = {}
            obj.val = str[index]
            obj.next = null
            return obj
        })
        .map((obj, index, nodes) => {
            if (index < nodes.length - 1) {
                obj.next = nodes[index + 1]
            }
            return obj;
        })

    console.log('nodes:', nodes)
    console.log('nodes[0]:', JSON.stringify(nodes[0], null, 2));
    let head = nodes[0];
    console.log('isPalindrome:', isPalindrome(head) ? true : false);
}


function removeNthFromEnd(head, n) {
    var count = 0;
    var dummy = new ListNode(-1);
    dummy.next = head;
    var p = head;
    var q = dummy;
    while (p) {
        if (count === n) {
            q = q.next;
        } else {
            count++;
        }
        p = p.next;
    }
    q.next = q.next.next;
    return dummy.next;
}
{
    var arr = [1, 2, 3, 4, 5];
    var nodes = arr
        .map((v, index) => {
            let obj = {
                val: v,
                next: null
            }
            return obj;
        })
        .map((obj, index, nodes) => {
            if (index < nodes.length - 1) {
                obj.next = nodes[index + 1];
            }
            return obj;
        })
    var head = nodes[0];
    let res = removeNthFromEnd(head, 2);
    console.log('removeNthNode:', JSON.stringify(res, null, 2));
}