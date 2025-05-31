import http from "../utils/request";

export default {
    //新建留言/照片
    insertWall(data) {
        return http.post('/insertWall', data)
    },

    //分页查询墙列表
    findWallPage(params) {
        return http.get('/findWallPage', { params })
    },

    //新建反馈（点赞、举报、撤销）
    insertFeedBack(data) {
        return http.post('/insertFeedBack', data)
    },

    //新建评论
    insertComment(data) {
        return http.post('/insertComment', data)
    },

    //倒叙分页查询墙的评论
    findCommentPage(params) {
        return http.get('/findCommentPage', { params })
    },

    //文件上传
    profile(data) {
        return http.post('/profile', data)
    },

    //注册用户
    insertUser(data) {
        return http.post('/insertUser', data)
    },

    //根据用户名查找用户
    findUserByUserName(data) {
        return http.post('/findUserByUserName', data)
    },

    //根据用户名和密码查找用户（用户登录）
    findUserByUserNameAndPassword(data) {
        return http.post('/findUserByUserNameAndPassword', data)
    },

    //更新用户信息
    updateUser(data) {
        return http.post('/updateUser', data)
    },
}