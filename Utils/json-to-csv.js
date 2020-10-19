/*
 * @Author: zhonghui.liao 
 * @Date: 2020-10-14 11:29:31 
 * @Last Modified by: zhonghui.liao
 * @Last Modified time: 2020-10-14 16:01:26
 */
const _ = require('underscore');

/**
 * 测试程序
 */
function TestToCsvWin() {
    const express = require('express');
    const router = express.Router();
    const json2csv = require('json2csv');
    const moment = require('moment')
    router.get('/exportcsv', function middleware(req, res, next) {
        let nickname = ['廖', '朱', '陈', '马'];
        let mobile = ['12378900001', '12378900002']; // TODO: 随机生成手机号
        let createdAt = ['20200101', '20200618', '20201001', '20201111'];
        let table = _.chain(_.range(20))
            .map((v, i) => {
                return {
                    nickname: nickname[i % nickname.length],
                    mobile: String('1237890', (new Array(4).join('0') + i).slice(-4)),
                    rewardcount: 1,
                    createdAt: createdAt[i % createdAt.length],
                }
            })
            .value();
        const rewardDetailFields = [
            { label: '用户昵称', value: 'nickname' },
            { label: '手机号码', value: 'mobile' },
            { label: '当前剩余抽奖次数', value: 'rewardcount' },
            { label: '抽奖日期', value: 'createdAt' },
        ];
        const Json2csvParser = json2csv.Parser;
        const rewardActivityDetailJson2csvParser = new Json2csvParser({ fields: rewardDetailFields, withBOM: true });
        let csvText = rewardActivityDetailJson2csvParser.parse(table);
        res.attachment(`export_json_data_${Date.now()}.csv`);
        res.send(csvText);
    });


    /**
     * super test
     */
    var request = require('supertest');
    var expressApp = require('./Express/App');
    var fs = require('fs');
    var writeStream = fs.createWriteStream('./demo.csv');
    expressApp.InitApp(router, async (app) => {
        request(app)
            .get('/exportCsv')
            .pipe(writeStream)
    })
}
TestToCsvWin();

function TestJsonToCsvReject() {
    const express = require('express');
    var router = express.Router();

    router.get('/exportCsv', async (req, res, next) => {
        // TODO: 修改为,拼接方法
        res.attachment(filename);
        res.send(data);
    });
    
    /**
     * super test
     */
    var request = require('supertest');
    var expressApp = require('./Express/App');
    var fs = require('fs');
    var writeStream = fs.createWriteStream('./demo.csv', 'w');
    expressApp.InitApp(router, async (app) => {
        request(app)
          .get('/exportCsv')
          .pipe(writeStream);
    })
}