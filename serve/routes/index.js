const { response } = require('express')
const controller = require('../controller/dbServe')

module.exports = function (app) {
    //新建留言/照片
    app.post('/insertWall', (request, response) => {
        controller.insertWall(request, response)
    })

    //新建反馈
    app.post('/insertFeedBack', (request, response) => {
        controller.insertFeedBack(request, response)
    })

    //新建评论
    app.post('/insertComment', (request, response) => {
        controller.insertComment(request, response)
    })

    //新建用户
    app.post('/insertUser', (request, response) => {
        controller.insertUser(request, response)
    })

    //删除墙，主表对映多条子表一起删除
    app.post('/deleteWall', (request, response) => {
        controller.deleteWall(request, response)
    })

    //删除反馈
    app.post('/deleteFeedback', (request, response) => {
        controller.deleteFeedback(request, response)
    })

    //删除评论
    app.post('/deleteComment', (request, response) => {
        controller.deleteComment(request, response)
    })

    //分页查询墙
    app.get('/findWallPage', (request, response) => {
        controller.findWallPage(request, response)
    })

    //倒叙分页查询墙的评论
    app.get('/findCommentPage', (request, response) => {
        controller.findCommentPage(request, response)
    })

    //根据用户名查找用户
    app.post('/findUserByUserName', (request, response) => {
        controller.findUserByUserName(request, response)
    })

    //根据用户名和密码查找用户（用户登录）
    app.post('/findUserByUserNameAndPassword', (request, response) => {
        controller.findUserByUserNameAndPassword(request, response)
    })

    //更新用户信息
    app.post('/updateUser', (request, response) => {
        controller.updateUser(request, response)
    })

    //获取ip
    app.post('/getIp',(request,response)=>{
        controller.getIp(request,response)
    })

    //根据邮箱和用户名修改密码
    app.post('/updatePasswordByEmail',(request,response)=>{
        controller.updatePasswordByEmail(request,response)
    })

    //根据用户名和邮箱查找用户
    app.post('/findUserByUserNameAndEmai',(request,response)=>{
        controller.findUserByUserNameAndEmai(request,response)
    })
}