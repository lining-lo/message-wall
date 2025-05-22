//引入express
const express = require('express')
//引入path
const path = require('path')
//引入ejs
const ejs = require('ejs')
//引入配置文件
const config = require('./config/default')

//创建express实例
const app = express()

//引入路由
require('./routes/index')(app)
require('./routes/files')(app)

//设置静态资源位置
app.use(express.static(__dirname + '/views'))
app.use(express.static(__dirname + '/data'))

//解析数据
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//加入html视图
app.engine('html', ejs.__express)
app.set('view engine', 'html')

//设置允许跨域访问该服务
// app.all('*', function (req, res, next) {
//     //允许访问ip *为所有
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//     req.header("X-Powered-By", '3.2.1')

//     //这段仅仅为了方便返回json而已
//     res.header("Content-Type", "application/json;charset=utf-8");
//     if (req.method == 'OPTIONS') {
//         //让options请求快速返回
//         res.sendStatus(200);
//     } else {
//         next();
//     }
// });

//监听端口，启动项目
app.listen(config.port, () => {
    console.log(`${config.port}端口监听中，项目启动`);
})