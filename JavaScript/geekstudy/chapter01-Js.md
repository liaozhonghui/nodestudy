# JavaScript

javascript的最小单位结构
atom:
- literal
- variable
- keywords
- whitespave
- line terminator

runtim:
- types
- execution context

## types
- Number
- String
- Boolean
- Object
- null
- undefined
- Symbol

### Number
IEEE 754 Double Float
- sign(1)
- exponent(11)
- fraction(52)
float计算
1,0000000000,1000000000000000...

### String
- character 字符
- code point 码点
- encoding 编码方式

字符集：[http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html](http://www.ruanyifeng.com/blog/2007/10/ascii_unicode_and_utf-8.html)
- ascii
- unicode
- ucs
- GB
- ISO-8859
- BIG5

编码方式：
UTF: UTF8, UTF16
使用js转化字符串为utf8编码：
```js
function UTF8_Encoding(string) {
    return new Buffer(string, 0, string.length * 3, 'utf8');
}
```
Node.js的buffer使用
1. Buffer.toString方法 .toString(encoding, start, end)
2. Buffer.write方法， .write(string, offset, length, encoding)
3. StringDecoder对象，
```js
StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');
var buf = new Buffer('一');
console.log(decoder.write(buf));
```

Grammer: 
单引号，双引号，反引号
string template: `ab${x}abc${y}abc`:
`ab${
}abc${
}abc

func`123` => func([123])

## Boolean
true false

## null & undefined
- null
- undefined
- void 0;


## Object & Symbol
class | prototype
4种api分类：
- {} . [] Object.defineProperty
- Object.create / Object.setPrototypeOf/ Object.getPrototypeOf
- new / class / extends
- new / function / prototype

Function Object
Host function