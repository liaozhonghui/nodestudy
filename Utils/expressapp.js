function initApp(router, callback) {
    let express = require('express');
    let app = express();
    app.use(function (req, res, next) {
        // todo: 中间件处理
        next()
    })
    app.use(router);

    app.use(function (err, req, res) {
        res.status(404).send('404 没有找到')
    })
    app.use(function (err, req, res) {
        res.status(500).send('500 服务器内部错误.')
    })
    app.listen(3000, (err) => {
        if (err) {
            console.error(err);
            process.exit(0);
        } else {
            console.log('Server is listening at http://localhost:3000');
            callback(app);
        }
    })
    return app;
}

/**
 * simple test express app
 */
async function main() {
    let express = require('express');
    let router = express.Router()
    router.get('/', (req, res, next) => {
        res.status(200).send('ping');
    })
    initApp(router, async (app) => {
        /**
             * test starting 
             */
        let request = require('supertest');
        let assert = require('assert');
        console.log('[app starting]: test starting.')
        request(app)
            .get('/')
            .expect(200)
            .end(function (err, res) {
                if (err) console.error(err);
                console.log('[app starting]: no fetch error.');
                assert.equal(res.text, 'ping');
                console.log('[app starting]: test end.')
            })
    });
}

main();

exports.initApp = initApp;