/**
 * 前序遍历
 */

function inorder(root) {
    let res = []
    let stack = []
    while (root || stack.length) {
        while (root) {
            stack.push(root);
            root = root.left;
        }
        root = stack.pop();
        res.push(root.val);
        root = root.right;
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
    let res = inorder(root);
    console.log('res: ', res);
}