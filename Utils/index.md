# utils 说明

## Func1: 数组转化为csv文件
做法1: 使用, 拼接，传统方式，使用Array.prototype.join(','), 使用fs.createWriteStream写入文件， 缺点：如果数据中包含特殊字符或者包含逗号，需要额外进行一次转化。 参考代码：无

做法2: json-to-csv
使用json2csv包，配置指定域，创建转化器parse函数即可进行转化：参考代码： [json-to-csv.js](./json-to-csv.js)

## 辅助1：Express App
参考代码：[Express App](./Express/App.js)

##