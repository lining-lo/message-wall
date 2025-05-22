const controller = require('../controller/dbServe')

module.exports = function (app) {
    //测试
    app.get('/test',(request,response)=>{
       response.type('html')
       response.render('test')
    })
}