/**
function ListNode(val) {
    this.val = val;
    this.next = null;
}
 */

function isPalindrome(head) {
    // 判断是否是回文链表
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

function mergeTwoList(l1, l2) {
    // 合并两个有序链表
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
function middleNode(head) {
    // 找到链表中的中间节点
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

function reverseList(head) {
    // 链表反转
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

function removeNthFromEnd(head, n) {
    // 删除链表的倒数第n个节点
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
