# 异步编程

## 异步编程的优势和难点
优势：
事件驱动的非阻塞I/O模型
难点：
1. 异常处理
try...catch... 使用回调函数处理， 约定错误为第一个参数
2. 函数嵌套太深
使用promise和async/await组合处理
3. 阻塞代码
不用sleep，约定使用setTimeout函数
4. 多线程编程
前端web workers
后端使用child_process进行控制，而cluster是更深层次的应用
5. 异步转同步
异步流程控制

## 异步编程的解决方案
事件发布/订阅模式

