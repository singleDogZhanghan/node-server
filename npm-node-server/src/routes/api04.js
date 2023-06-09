const {removeData, getData} = require('../cache/index');
// post 移除person
module.exports = function handler(req, res) {
    removeData(req.body.tableName || 'person', req.body.data || []);
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.send({
        code: 200,
        result: getData(req.body.tableName || 'person'),
    })
}
