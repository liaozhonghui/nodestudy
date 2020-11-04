/**
function ListNode(val) {
    this.val = val;
    this.next = null;
}
 */

// 判断是否是回文链表
function isPalindrome(head) {
    if (!head || !head.next) return true;

    var prev = null;
    var slow = head;
    var quick = head;

    while(quick && quick.next) {
        quick = quick.next.next;
        let node = slow.next;
        slow.next = prev;
        prev = slow;
        slow = node;
    }
    if (quick) {
        slow = slow.next;
    }
    while (slow) {
        if (slow.val != prev.val) return false;
        slow = slow.next;
        prev = prev.next;
    }
    return true;
}

// 合并两个有序链表
function mergeTwoList(l1, l2) {
    var head = new ListNode(-1);
    var p = head;
    while(l1 && l2) {
        if (l1.val <= l2.val) {
            p.next = l1;
            l1 = l1.next;
        } else {
            p.next = l2;
            l2 = l2.next;
        }
        p = p.next;
    }
    p.next = l1 ? l1 : l2;
    return head.next;
}

// 找到链表中的中间节点
function middleNode(head) {
    if (!head || !head.next) return head;
    var slow = head;
    var quick = head;

    while (quick.next && quick.next.next) {
        slow = slow.next;
        quick = quick.next.next;
    }
    if (quick && quick.next) {
        slow = slow.next;
    }
    return slow;
}

// 链表反转
function reverseList(head) {
    if (!head) return head;
    var prev = null;
    while(head) {
        let node = head.next;
        head.next = prev;
        prev = head;
        head = node;
    }
    return prev;
}

// 删除链表的倒数第n个节点
function removeNthFromEnd(head, n) {
    var count = 0;
    var dummy = new ListNode(-1);
    dummy.next = head;
    var p = head;
    var q = dummy;
    while(p) {
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

// 两两交换链表中的节点
var swapPairs = function (head) {
    let dummy = new ListNode(-1);
    dummy.next = head;
    let p = dummy;
    while (head && head.next) {
        let node = head.next.next;
        p.next = head.next; 
        p.next.next = head;
        p = p.next.next;
        head = node;
        p.next = head;
    }
    return dummy.next;
}

// 链表中环的检测, 返回环的起点
function detectCycle(head) {
    if (!head) return null;
    let slow = head;
    let quick = head;
    while (quick.next && quick.next.next) {
        quick = quick.next.next;
        slow = slow.next;
        if (quick === slow) {
            let ptr = head;
            while (ptr != slow) {
                ptr = ptr.next;
                slow = slow.next;
            }
            return ptr;
        }
    }
    return null;
}