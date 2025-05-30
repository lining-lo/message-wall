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
}