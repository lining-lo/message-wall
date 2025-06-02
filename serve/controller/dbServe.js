const { response } = require('express')
const db = require('../lib/db')

//新建留言/照片
exports.insertWall = async (request, response) => {
    const data = request.body
    await db.insertWall([data.type, data.message, data.name, data.userId, data.moment, data.label, data.color, data.imgurl]).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}

//新建反馈
exports.insertFeedBack = async (request, response) => {
    const data = request.body
    await db.insertFeedBack([data.wallId, data.userId, data.type, data.moment]).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}

//新建评论
exports.insertComment = async (request, response) => {
    const data = request.body
    await db.insertComment([data.wallId, data.userId, data.imgurl, data.comment, data.name, data.moment]).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}

//新建用户
exports.insertUser = async (request, response) => {
    const data = request.body
    await db.insertUser([data.username, data.password, data.moment]).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}

//删除墙，主表对映多条子表一起删除
exports.deleteWall = async (request, response) => {
    const data = request.body
    await db.deleteWall([data.id]).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}

//删除反馈
exports.deleteFeedback = async (request, response) => {
    const data = request.body
    await db.deleteFeedback([data.id]).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}

//删除评论
exports.deleteComment = async (request, response) => {
    const data = request.body
    await db.deleteComment([data.id]).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}

//分页查询墙
exports.findWallPage = async (request, response) => {
    let result = null

    //处理数据
    const data = request.query
    const type = parseInt(data.type)
    const label = parseInt(data.label)
    const page = parseInt(data.page)
    const pagesize = parseInt(data.pagesize)

    await db.findWallPage(page, pagesize, type, label).then(async result => {
        //查询各反馈总数据
        for (let i = 0; i < result.length; i++) {
            //喜爱总数
            result[i].like = await db.feedbackCount(result[i].id, 0)
            //举报总数
            result[i].report = await db.feedbackCount(result[i].id, 1)
            //要求撤销总数
            result[i].revoke = await db.feedbackCount(result[i].id, 2)
            //评论总数
            result[i].commentCount = await db.commentCount(result[i].id)
            //是否点赞
            result[i].isLike = await db.isLike(result[i].id, data.userId)
        }

        //返回结果
        response.send({
            code: 200,
            message: result
        })
    })
}

//倒叙分页查询墙的评论
exports.findCommentPage = async (request, response) => {
    //处理数据
    const data = request.query
    const wallId = parseInt(data.wallId)
    const page = parseInt(data.page)
    const pagesize = parseInt(data.pagesize)

    await db.findCommentPage(wallId, page, pagesize).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}

//根据用户名查找用户
exports.findUserByUserName = async (request, response) => {
    const data = request.body

    await db.findUserByUserName(data.username).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}

//根据用户名和密码查找用户（用户登录）
exports.findUserByUserNameAndPassword = async (request, response) => {
    const data = request.body

    await db.findUserByUserNameAndPassword(data.username, data.password).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}

//更新用户信息
exports.updateUser = async (request, response) => {
    const data = request.body

    await db.updateUser(data.username, data.password, data.email, data.imgurl, data.id).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}

//获取ip
exports.getIp = async (request, response) => {
    response.send({
        code: 200,
        message: request.ip
    })
}

//根据邮箱和用户名修改密码
exports.updatePasswordByEmail = async (request, response) => {
    const data = request.body

    await db.updatePasswordByEmail(data.password, data.username, data.email).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}

//根据用户名和邮箱查找用户
exports.findUserByUserNameAndEmai = async (request, response) => {
    const data = request.body

    await db.findUserByUserNameAndEmai( data.username, data.email).then(result => {
        response.send({
            code: 200,
            message: result
        })
    })
}
