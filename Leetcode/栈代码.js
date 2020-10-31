/**
 * 栈相关题目
 */
function isVaild(s) {
    // 括号匹配
    let stack = [];

    for (let i = 0; i < s.length; i++) {
        if (s[i] === '(' || s[i] === '{' || s[i] === '[') stack.push(s[i]);
        else {
            let top = stack.pop();
            if ((s[i] === ')' && top !== '(')
                || (s[i] === '}' && top !== '{')
                || (s[i] === ']' && top !== '[')
            ) return false;
        }
    }
    return stack.length === 0;
}
function isValid(s) {
    let stack = [];
    for (let c of s) {
        if (c === '(') stack.push(')');
        else if (c === '{') stack.push('}');
        else if (c === '[') stack.push(']');
        else if (stack.length === 0 || c != stack.pop()) return false;
    }
    return stack.length === 0;
}