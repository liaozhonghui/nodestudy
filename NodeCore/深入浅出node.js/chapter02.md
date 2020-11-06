# Node.js的模块机制

commonJS的模块规范
1. 模块引用 require
2. 模块定义 exports module.exports
3. 模块标识 小驼峰命名的字符串，或者以. ..开头的相对路径

## Node中引入模块需要进行3个步骤
1. 路径分析
2. 文件定位
3. 编译执行

模块缓存，核心模块> 文件模块

路径分析：
核心模块(http, fs, path) > . .. 文件模块 > 自定义模块(node_modules, 父级node_modules进行查找，直到查找到跟目录)
文件定位:
.js > .json > .node > package.json(main) > index.js .json .node

模块编译：
每个文件模块都是一个对象
```txt
- .js文件 通过fs模块同步读取文件之后编译执行
- .node文件 这个是使用c/c++编写的拓展文件，通过dlopen方法加载最后编译生成的文件
- .json文件，通过fs模块同步读取文件之后，用JSON.parse()解析返回结果
- 其余拓展名文件， 他们都被当做.js文件载入
```
每一个编译成功的模块都会将其文件路径作为索引缓存在Module._cache对象上，以提高二次引入的性能

### javascript模块的编译原理
require exports module __filename __dirname
在编译的过程中， Node会对获取的JavaScript文件内容进行头尾包装，在头部增加(function(exports, require, module, __filename, __dirname))
好处：每个模块文件之间都进行了作用域隔离， 包装之后的代码会通过vm原生模块的runInThisContext方法执行，返回一个具体的function对象，最后将当前模块对象的exports属性，require方法，module以及在文件定位中得到的完整文件路径和文件目录最为参数传递给这个fucntion()执行。
小知识： module.exports是模块导出对象赋值，而exports只是引用

### C/C++模块的编译
.node模块是编译好的文件，使用proces.dlopen()方法进行加载和执行即可，而且在执行的过程中，模块的exports对象与.node模块产生了连写，然后返回给调用者。

### Json文件的编译
node使用fs获取到文件之后，使用JSON.parse()方法获取到对象，然后将它赋值给模块对象的exports
当json文件用作项目的配置文件时特别有用，使用require()引入之后，二次引入可以直接使用缓存中的数据，对性能没有影响.

## 核心模块
JavaScript核心模块的编译过程
1. 转存为c/c++代码，并且将代码以字符串的格式存储在node命名空间中
2. 编译Javascript核心模块的时候，也经历了头尾包装的过程，然后才执行和导出了exports对象，与文件模块的区别在于：获取源码的方式是从内存中直接加载（通过process.binding('natives'），而且缓存执行结果的位置在NativeModule._cache上，而文件模块则缓存到Module._cache上

c/c++核心模块的编译过程
代表：buffer, crypto, evals, fs, os
1. 内建模块的组织形式： 
node_module_list, 通过内建的get_builtin_module()方法从node_module_list中取出这些模块
而且取出之后可以直接执行，因为在node开始执行的时候，这些c/c++内建模块就已经编译成二进制文件直接加载到内存中了。
2. 内建模块的导出
process.binding()是加载内建模块的核心处理
在加载内建模块的时候，先创建一个空的exports对象，然后调用get_builtin_module()方法取出内建模块对象，通过执行register_func填充exports对象，最后将exports对象按照模块名称进行缓存，并返回给调用方完成导出
比如javascript核心文件被转换成c++数组存储之后，通过process.binding('natives') 取出，然后放置到NativeModule._source中的：
```js
NativeModule._source = process.binding('natives');
```
例如：os核心模块的引入流程：
```js
NODE_MODULE(node_os, ref_func) => get_builtin_module('node_os') => process.binding('os') => NativeModule.require('os') => require('os')
```

## C/C++拓展模块
javascript的一个典型弱点就是位运算：由于Javascript中之后double的数据烈性，在进行位运算的时候，需要将double型转换为int型，然后再进行处理.
c++模块编译流程：
```js
C/C++源码 => g++/gcc => .so文件(生成.node文件) => 加载.so文件(使用dlopen()加载) => 导出给JavaScript
```
编写C/C++的前提条件：
1. gyp项目生成工具
2. v8引擎C++库
3. libuv库
4. Node内部库
5. 其他库

C/C++拓展模块的编写：
```c++
#include <node.h>
#include <v8.h>

using namespace v8;
Handle<Value> SayHello(const Arguments* args) {
    HandleScope scope;
    return scope.Close(String::New("Hello world!"));
}
void Init_Hello(Handle<Object> target) {
    target->Set(String::NewSymbol("sayHello"), FunctionTemplate::New(SayHello)->GetFunction());
}
NODE_MODULE(hello, Init_Hello);
```

## 模块调用栈
文件模块调用其他第三方文件模块
文件模块调用核心模块
不直接使用process.binding()调用内建模块

## 包与NPM
包结构
```js
- package.json 包描述文件
- bin 用于存放可执行二进制文件的目录
- lib 用于存放JavaScript代码的目录
- doc 用于存放文档的目录
- test 用于存放单元测试用例的代码

包描述文件和NPM
package.json
```js
name 包名，小写字母
description
version
keywords
maintainers
repositories
homepage
os
directories
scripts 主要被包管理器用来安装，编译，测试和卸载包
dependencies
```
NPM 多了author bin main devDependencies字段
bin字段用途是用来当做命令行工具的
main字段用来表示模块的入口文件
npm 常用功能
```txt
npm -v 
npm install -D
npm install -g
npm install --save
// 本地安装 
npm install <folder>
npm install --registry= (nrm)
npm config set registry https://registry.url
```
对于一些C/C++模块，是需要进行编译之后才能够使用的，所以scripts字段中让包安装或者卸载等过程中提供钩子机制, 在该目录下执行npm install <package>的时候，preinstall执行的脚本会被加载执行
```js
scripts: {
    preinstall: "preinstall.js",
    install: "install.js",
    uninstall: "uninstall.js",
    test: "test.js"
}
```
包的发布 npm adduser, npm publish ./ 
包管理权限(多人发布权限)： `npm owner ls <packagename>`
npm ls 分析包

### 局域NPM  
可以通过源代码进行搭建
### NPM潜在问题
包质量和安全问题
- 具备良好的测试
- 具备良好的文档
- 具备良好的测试覆盖率
- 具备良好的编码规范
- 更多其他条件

## 前后端公用模块
浏览器端的瓶颈在于带宽，需要通过网络加载代码
服务端的瓶颈在于CPU和内存资源等， 需要通过磁盘加载代码

浏览器端使用AMD规范
服务器端使用CommonJS规范
```js
// AMD
// 模板：define(id?, dependencies?, factory)
define(function() {
    var exports = {};
    exports.sayHello = function() {
        alert('Hello' + module.id);
    }
    return exports;
})
```
多规范兼容代码
```js
(function (name, definition) {
    var hasDefine = typeof define === 'function';
    var hasExports = typeof module !== 'undefined' && module.exports;
    if (hasDefine) {
        // AMD或者CMD环境
        define(definition);
    } else if (hasExports) {
        // NODE环境
        module.exports = definition()
    } else {
        // 将模块的执行结果挂在window变量中，在浏览器中this只想window对象
        this[name] = definition()
    }
})('hello', function() {
    var hello = function() {};
    return hello;
})
```


