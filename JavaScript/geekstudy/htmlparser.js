const css = require('css');

const EOF = Symbol('EOF');

/**
 * global
 */
let currentToken = null;
let currentAttribute = null;
let currentTreeNode = [];
let currentTextNode = null;
let stack = [{ type: 'document', children: []}];

let rules = [];
function addCSSRules(text) {
    var ast = css.parse(text);
    console.log(JSON.stringify(ast, null, "   "));
    rules.push(...ast.stylesheet.rules);
}

function computeCss(element) {
    // 获取父元素， css匹配顺序从内向外
    var elements = stack.slice().reverse();
    
}
function emit(token) {
    /**
     * 使用栈生成dom树结构
     */
    // TODO: Upgrade: 使用队列缓存数据，异步生成dom树
    currentTreeNode.push(Object.assign({}, token));

    let top = stack[stack.length - 1];
    if (token.type === 'startTag') {
        let element = {
            type: 'element',
            children: [],
            attributes: [],
            isSelfClosing: token.isSelfClosing
        }
        element.tagName = token.tagName;
        for (let p in token) {
            if (p != 'type' && p != 'tagName') {
                element.attributes.push({ name: p, value: token[p] });
            }
        }
        computeCSS(element);

        top.children.push(element);
        element.parent = top;
        
        if(!element.isSelfClosing) stack.push(element);
        currentTextNode = null;
    } else if (token.type === 'endTag') {
        if (top.tagName != token.tagName) {
            throw new Error('Tag start end doesn\'t match!');
        } else {
            // 遇到stype标签，执行添加CSS规则的操作
            if (top.tagName === 'style') {
                addCSSRules(top.children[0].content)
            }
            stack.pop();
        }
        currentTextNode = null;
    } else if (token.type === 'text') {
        if (currentTextNode === null) {
            currentTextNode = {
                type: 'text',
                content: ''
            }
            top.children.push(currentTextNode);
        }
        currentTextNode.content += token.content;
    }
} 

function data(c) {
    if (c === '<') {
        return tagOpen;
    } else if (c === EOF) {
        emit({ type: 'EOF' })
    } else {
        emit({ type: 'text', content: c })
        return data;
    }
}
function tagOpen(c) {
    if (c === '/') {
        return endTagOpen;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken = {
            type: 'startTag',
            tagName: ''
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

    } else if (c === EOF) {
        return;
    } else {
        return;
    }
}
function tagName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '/') {
        return selfClosingStartTag;
    } else if (c.match(/^[a-zA-Z]$/)) {
        currentToken.tagName += c;
        return tagName;
    } else if (c === '>') {
        emit(currentToken);
        return data;
    } else {
        return tagName;
    }
}
function beforeAttributeName(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '>' || c === '/' || c === EOF) {
        return afterAttributeName(c);
    } else if (c === '') {
        // err
    } else {
        currentAttribute = {
            name: '',
            value: ''
        }
        return attributeName(c);
    }
}

function attributeName(c) {
    if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
        return afterAttributeName(c);
    } else if (c === '=') {
        return beforeAttributeValue
    } else if (c === '\u0000') {
        // err
    } else if (c === '\"' || c === '\'' || c === '<') {

    } else {
        currentAttribute.name += c;
        return attributeName;
    }
}
function beforeAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/) || c === '/' || c === '>' || c === EOF) {
        return beforeAttributeValue;
    } else if (c === '\"') {
        return doubleQutoedAttributeValue;
    } else if (c === '\'') {
        return singleQuotedAttributeValue;
    } else if (c === '>') {
        // return data;
    } else {
        return UnquotedAttributeValue(c);
    }
}
function doubleQutoedAttributeValue(c) {
    if (c === '\"') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c === '\u0000') {

    } else if (c === EOF) {

    } else {
        currentAttribute.value += c;
        return doubleQutoedAttributeValue;
    }
}
function singleQuotedAttributeValue(c) {
    if (c === '\'') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return afterQuotedAttributeValue;
    } else if (c === '\u0000') {

    } else if (c === EOF) {

    } else {
        currentAttribute.value += c;
        return singleQuotedAttributeValue;
    }
}
function afterQuotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        return beforeAttributeName;
    } else if (c === '/') {
        return selfClosingStartTag;
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c === EOF) {

    } else {
        // err 不合法 <div a='a'a
    }
}
function UnquotedAttributeValue(c) {
    if (c.match(/^[\t\n\f ]$/)) {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return beforeAttributeName;
    } else if (c === '/') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        return selfClosingStartTag;
    } else if (c === '>') {
        currentToken[currentAttribute.name] = currentAttribute.value;
        emit(currentToken);
        return data;
    } else if (c === '\u0000') {
        // err
    } else if (c === EOF) {
        // err
    } else if (c === '\"' || c === '\'' || c === '<' || c === '=' || c === '`') {
        // err
    } else {
        currentAttribute.value += c;
        return UnquotedAttributeValue;
    }
}
function afterAttributeName(c) {
    if (c === '/') {
        return selfClosingStartTag;
    } else if (c === '>') {
        emit(currentToken);
        return data;
    } else if (c === EOF) {
        // err
    } else {

    }
}
function selfClosingStartTag(c) {
    if (c === '>') {
        currentToken.isSelfClosing = true;
        emit(currentToken);
        return data;
    } else if (c === EOF) {
        return;
    } else {
        return;
    }
}

module.exports.parseHtml = function parseHtml(html) {
    let state = data;
    for (let c of html) {
        state = state(c);
    }
    state = state(EOF);
    return stack[0];
}