# 重学JavaScript

## chapter00:
将前端目录进行列举出来， 知识体系脑图
1. 将面向对象这个概念用追溯法写一篇博文， 写在自己的博客中，如：博客园，稀土，掘金等， 也可以卸载github中的issue中，不限制语言逻辑

## chapter01
1. JavaScript类型细节
2. JavaScript面向对象还是基于对象
3. JavaScript真的需要模拟类吗？
4. JavaScript对象：全部的对象分类
5. JavaScript执行：Promise中的代码为什么比setTimeout先执行
6. JavaScript执行： 闭包和上下文究竟是怎么回事？
7. JavaScript: 现在有多少种函数？
8. try里面放置return, finally还会执行吗？
9. 为什么12.toString会报错
10. 一个四则运算的解释器
11. 到底要不要写分号呢？
12. 在script标签中写export为什么会报错？
13. 你知道哪些JavaScript语句
14. 什么是表达式语句？
15. 新加入的**运算符号， 哪里有些不一样呢？

语言分类：
1. 乔姆斯基谱系： 
    - 0型 无限制文法
    - 1型 上下文相关文法
    - 2型 上下文无关文法
    - 3型 正则文法

2. 产生式 BNF 
  - <> 表示语法结构名
  - 基础结构（终结符）复合结构（非终结符）
  - 引号和中间的字符表示终结符
  - 可以有括号
  - * 表示重复多次
  - | 表示或
  - + 表示至少一次

现代语言的特例：
语言分类：
    - 数据描述语言 json, html
    - 编程语言
形式语言-表达方式：
    - 声明式语言
    - 命令式语言
编程语言的性质： 图灵完备性：
命令式- 图灵机 : goto, if/while
声明式-lambda : 递归

动态与静态：
动态： 1. 在用户的设备、在线服务器中，runtime
静态：1. 在程序员的设备上, Compiletime

类型系统：
- 动态烈性系统与静态类型系统
- 强类型与弱类型 String, Number, String, boolean
- 复合类型 结构类型，函数签名
- 子类型
- 泛型 逆变、协变

命令式语言的设计方式

- aton
- expression
- statement
- structure
- program
语法->语义->运行时