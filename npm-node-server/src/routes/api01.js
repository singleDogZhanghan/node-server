const {getData} = require('../cache/index');
// list 人员表格
module.exports = function handler(req, res) {
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.send({
        code: 200,
        result: getData(req.query.tableName || 'person')
    })
}
