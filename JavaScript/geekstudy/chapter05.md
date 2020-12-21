# 浏览器

## HTML parser
文件拆分

3中标签, 开始标签，结束标签，自封闭标签
标签名称：以<开始， 以空格，制表符，换行，禁止符为结尾(\t\n\f)
```js
let currentToken = null
function emit(token) {
    conosole.log(token);
}

const EOF = Symbol('EOF');

function data(c) {
    if (c === '<') {
        return tagOpen;
    } else if (c === EOF) {
        emit({ type: 'EOF' })
    } else {
        emit({ type: 'text', content: c})
        return data;
    }
}
function tagOpen(c) {
    if (c === '/') {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: '';
        }
        return tagName(c)
    } else return;
}
function endTagOpen(c) {
    if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'endTag',
            tagName: ''
        }
        return tagName(c)
    } else if (c === '>') {

    } else if (c == EOF) {
        return;
    } else {
        return;
    }
}
function tagName(c){
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '/'){
        return selfClosingStartTag;
    } else if (c.math(/^[a-zA-Z]$/)) {
        currentToken.tagName += c;
        return tagName;
    } else if(c === '>') {;
        return data;
    } else {
        return tagName;
    }
}
function beforAttributeName () {
    if (c.match(/^]\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '>' || c === '/' || c === EOF) {
        return data;
    } else {
        currentAttribute = {
            name: "",
            value: ""
        }
        return attributeName(c);
    }
}

function attributeName (c ) {
    if (c.match(/^[\t\n\f ]$/))
} 
function selfClosingStartTag () {
    if (c === '>') {
        currentToken.isSelfClosing = true;
        return data;
    } else if (c === EOF) {
        return ;
    } else {
        return 
    }
}
```