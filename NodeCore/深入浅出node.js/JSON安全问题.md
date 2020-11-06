JSON流行原因：
1. JSON能够与JavaScript无缝对接
2. JSON能够轻松的实现跨域

问题：
1. 为什么XMLHttpRequest需要遵循同源策略？如果不准守同源策略，用户在浏览网站时，黑客就可以发起请求，获取到内部网站数据。
2. XMLHttpRequest请求会不会带cookie? 同域情况下会，不同域情况下不会，如果服务端设置Access-Control-Allow-Credential:true, 也是可以跨域带cookie的
3. `<script>`标签请求会不会带cookie? 会
4. 向一个其他域名的网站提交form，会不会带cookie? 会
5. CORS请求能不能带cookie?  默认不带，但是服务器设置access-control-allow-credentail:true的时候，也会带cookie

JSON注入：
1. 字符串拼接, 拼接注入数据
```java
String.format("{user: %s, password: %s}", 'test', "12345',admin: 'true");
```
2. http parameters 参数字符串，拼接注入数据

解决方式： 浏览器使用JSON.parse 而不是eval去执行JSON转化

JSONP callback注入

总结：
- 禁止手动拼接JSON字符串，使用JSON库
- jsonp请求的callback要严格过滤，只允许_ 0-9, a-z, A-Z即合法的javascript函数命名 `^[0-9a-zA-Z_.]+$`
- jsonp也要判断合法性，判断用户是否登录，是否具有操作权限
- 设置好ContentType 放置返回字符串数据解析成默认格式
- 以jsonp方式调用第三方的接口，实际相当于引入了第三方的JS代码，要慎重。
