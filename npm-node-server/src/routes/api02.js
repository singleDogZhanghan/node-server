const {addData, getData} = require('../cache/index');
// post 新增person
module.exports = function handler(req, res) {
    console.log('req.body: ', req.body.tableName, req.body.data,);
    addData(req.body.tableName || 'person', req.body.data || []);
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.send({
        code: 200,
        result: getData(req.body.tableName || 'person'),
    })
}
