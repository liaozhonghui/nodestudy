let assert = require('assert');
const { errorMonitor } = require('stream');

{
    assert(true, "断言assert()");
}
{
    let a = {
        a: 1,
        b: {
            a:1
        }
    }
    let b = {
        a: 1,
        b: {
            a: '1'
        }
    }
    assert.deepEqual(a, b, "a, b deepEqual.")
}
{
    let a = {
        a: 1, 
        b: {
            a: 1
        }
    }
    let b = {
        a: 1,
        b: {
            a: 1,
        }
    }
    assert.deepStrictEqual(a, b, "a, b deepEqual.");
}
{
    let a = 'fakao'
    let b = /[1-9]/
    assert.doesNotMatch(a, b, '不匹配.')
}
{
    function timer (len) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve()
            }, len || 100);
        })
    }
    assert.doesNotReject(() => timer(200), "异步函数抛出了异常.");
}

{
    let errfn = () => {
        throw new TypeError('出错了.')
    }
    // assert.doesNotThrow(errfn, TypeError, '函数内部throw');
    // assert.doesNotThrow(errfn, /出/, '函数内部抛出了异常')
}
{
    let a = "我是个好人"
    let b = "我是个好人"
    assert.equal(a, b, "a与b不相等.")
}
{
    let message = "手动抛出异常"
    let message1 = new TypeError('抛出类型异常')
    // assert.fail(message1);
}
{
    let err1 = null;
    let err2 = 0;
    let err3 = '错误'
    let err4 = new Error()
    assert.ifError(err1)
}
{
    let a = "我是个好人"
    let b = /好人/
    assert.match(a, b, "a跟b不匹配.")
}
{
    assert.ok([], "assert.ok not success.")
}
{
    async function fn () {
        throw new SyntaxError("错误值")
    }
    assert.rejects(fn, { name: 'SyntaxError', message: '错误值' }, '程序没有抛出异常.');
}
{
    const {message } = new assert.AssertionError({
        actual: 1,
        expected: 2,
        operator: 'strictEqual',
        // message: '数据应该等于2'
    })
    try {
        assert.strictEqual(1, 2, '数据应该等于2');
    } catch (err) {
        assert.strictEqual(err.message, message);
    }
}