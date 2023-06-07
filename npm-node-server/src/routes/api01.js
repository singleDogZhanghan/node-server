module.exports = function handler(req, res) {
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.send({
        code: 200,
        result: {
            title: '测试',
            value: 'test',
        }
    })
}
