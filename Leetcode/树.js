/**
 * 前序，中序，后序遍历：递归实现
 */
function postorderTraversal(root) {
    function preorder(root, res) {
        if (!root) return;
        res.push(root.val);
        preorder(root.left, res);
        preorder(root.right, res);
    }
    function inorder(root, res) {
        if (!root) return;
        inorder(root.left, res);
        res.push(root.val);
        inorder(root.right, res);
    }
    function postorder(root, res) {
        if (!root) return;
        postorder(root.left, res);
        postorder(root.right, res);
        res.push(root.val);
    }
    let res = [];
    postorder(root, res);
    return res;
}

/**
 * 前序，中序，后序遍历：迭代法
 */
function preorder(root) {
    let res = [];
    let stack = [];
    while (root || stack.length) { 
        while(root) {
            res.push(root.val);
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        root = root.right;
    }
    return res;
}
function inorder(root) {
    let res = [];
    let stack = [];
    while (root || stack.length) {
        while(root) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        res.push(root.val);
        root = root.right;
    }
    return res;
}
function postorder(root) {
    let res = [];
    let stack = [];
    let prev = null;
    while (root || stack.length) {
        while(root) {
            stack.push(root);
            root = root.left;
        }
        if (root.right === null || root.right === prev) {
            res.push(root.val);
            prev = root;
            root = null;
        } else {
            root = root.right;
        }
    }
    return res;
}

{
    // test
    let root = {
        val: '1',
        left: null,
        right: {
            val: '2',
            left: {
                val: '3',
                left: null,
                right: null
            },
            right: null
        }
    }
    let res = postorder(root);
    console.log('res: ', res);
}
