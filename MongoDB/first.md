# MongoDB

## MongoDB优势

快速：MongoDB只需要两行代码
原生的高可用和横向拓展能力
Application-> Driver-> Primary(Secondary, Secondary)
Replica Set - 2 to 50 个成员(一般选择3个)
自恢复

横向拓展能力：
- 需要的时候无缝拓展
- 应用全透明
- 多种数据分布策略
- 轻松支持TB-PB的数量级

技术优势总结
Json结构和对象模型接近，开发代码量低
json的动态模型意味着更容易响应新的业务需求
复制集提供了99.999%高可用
分片结构支持海量数据和无缝扩容



MongoDB安装

地址：
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

```txt
默认配置位置
the configuration file (/usr/local/etc/mongod.conf)
the log directory path (/usr/local/var/log/mongodb)
the data directory path (/usr/local/var/mongodb)
```

MongoDB Shell安装方法
`brew install mongodb/brew/mongodb-community-shell`

MongoDB Compress安装
https://www.mongodb.com/try/download/compass

数据导入：
curl -O -k https://raw.githubusercontent.com/tapdata/geektime-mongodb-course/master/aggregation/dump.tar.gz

tar -xvf dump.tar.gz

mongorestore -h localhost:27017

