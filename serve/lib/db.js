const mysql = require('mysql')
const config = require('../config/default')

//创建连接
const connection = mysql.createConnection({
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
})

//创建连接池
const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
    database: config.database.DATABASE
})

//封装connection的query方法
const bdbs = (sql, values) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (error, result) => {
            if (error) {
                reject(error)
            } else {
                resolve(result)
            }
        })
    })
}

//封装pool的query方法
const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((error, connection) => {
            if (error) {
                reject(error)
            } else {
                connection.query(sql, values, (error, result) => {
                    if (error) {
                        reject(error)
                    } else {
                        resolve(result)
                    }
                    connection.release()//释放连接
                })
            }
        })
    })
}

//创建数据库sql
const createDatabaseSql = `create database if not exists wall default charset utf8 collate utf8_general_ci;`

//创建数据库的方法
const createDatabase = (sql) => {
    return bdbs(sql, [])
}

//创建留言/照片数据表sql
const wallsSql =
    `create table if not exists walls(
     id INT NOT NULL AUTO_INCREMENT,
     type INT NOT NULL COMMENT '类型0信息1图片', 
     message VARCHAR(1000) COMMENT '留言',
     name VARCHAR(100) NOT NULL COMMENT '用户名',
     userId VARCHAR(100) NOT NULL COMMENT '创建者ID', 
     moment VARCHAR(100) NOT NULL COMMENT '时间' ,
     label INT NOT NULL COMMENT '标签',
     color INT COMMENT '颜色',
     imgurl VARCHAR(100) COMMENT '图片路径',
     PRIMARY KEY (id )
    );`

//创建反馈数据表sql
const feedbacksSql =
    `create table if not exists feedbacks( 
     id INT NOT NULL AUTO_INCREMENT,
     wallId INT NOT NULL COMMENT '墙留言ID',
     userId VARCHAR(100) NOT NULL COMMENT '反馈者ID',
     type INT NOT NULL COMMENT '反馈类型0喜欢1举报2撤销',
     moment VARCHAR(100) NOT NULL COMMENT '时间',
     PRIMARY KEY (  id )
    );`

//创建评论数据表sql
const commentsSql =
    `create table if not exists comments( 
     id INT NOT NULL AUTO_INCREMENT,
     wallId INT NOT NULL COMMENT '墙留言ID',
     userId VARCHAR(100) NOT NULL COMMENT '评论者ID',
     imgurl VARCHAR(100) COMMENT '头像路径',
     comment VARCHAR(1000) COMMENT '评论内容',
     name VARCHAR(100) NOT NULL COMMENT '用户名', 
     moment VARCHAR(100) NOT NULL COMMENT '时间',
     PRIMARY KEY ( id )
    );`

//创建用户数据表sql
const userSql =
    `create table if not exists user( 
     id INT NOT NULL AUTO_INCREMENT,
     username VARCHAR(100) NOT NULL COMMENT '用户名',
     password VARCHAR(100) NOT NULL COMMENT '密码',
     imgurl VARCHAR(100) COMMENT '头像路径',
     permission INT DEFAULT 1 COMMENT '权限(0管理员,1普通用户)',
     moment VARCHAR(100) NOT NULL COMMENT '创建时间',
     email VARCHAR(100) COMMENT '邮箱',
     PRIMARY KEY ( id )
);`

//创建数据表的方法
const createTable = (sql) => {
    return query(sql, [])
}

//控制先创建数据库再创建表的方法
const create = async () => {
    await createDatabase(createDatabaseSql)
    createTable(wallsSql)
    createTable(feedbacksSql)
    createTable(commentsSql)
    createTable(userSql)
}

create()

//新建留言/照片
exports.insertWall = (values) => {
    const sql = "insert into walls set type=?,message=?,name=?,userId=?,moment=?,label=?,color=?,imgurl=?;"
    return query(sql, values)
}

//新建反馈
exports.insertFeedBack = (values) => {
    const sql = 'insert into feedbacks set wallId=?,userId=?,type=?,moment=?;'
    return query(sql, values)
}

//新建评论
exports.insertComment = (values) => {
    const sql = 'insert into comments set wallId=?,userId=?,imgurl=?,comment=?,name=?,moment=?;'
    return query(sql, values)
}

//新建用户
exports.insertUser = (values) => {
    const sql = 'insert into user set username=?,password=?,moment=?;'
    return query(sql, values)
}


//删除墙，主表对映多条子表一起删除
exports.deleteWall = (id) => {
    const sql = `delete a,b,c from walls a LEFT JOIN feedbacks b on a.id=b.wallId LEFT JOIN comments c on a.id=c.wallId where a.id = ?;`
    return query(sql, id)
}


//删除反馈
exports.deleteFeedback = (id) => {
    const sql = `delete from feedbacks WHERE id = ?;`
    return query(sql, id)
}

//删除评论
exports.deleteComment = (id) => {
    const sql = `delete from comments WHERE id = ?;`
    return query(sql, id)
}

//分页查询墙
exports.findWallPage = (page, pagesize, type, label) => {
    let sql = ''
    if (label === -1) {
        //查询全部
        sql = `select * from walls WHERE type=? order by id desc LIMIT ?,?;`
        return query(sql, [type, (page - 1) * pagesize, pagesize])
    } else {
        //查询选择的标签
        sql = `select * from walls WHERE type=? AND label=? LIMIT ?,?;`
        return query(sql, [type, label, (page - 1) * pagesize, pagesize])
    }
}

//倒叙分页查询墙的评论
exports.findCommentPage = (wallId, page, pagesize) => {
    const sql = `SELECT * FROM comments WHERE wallId = ? ORDER BY id desc LIMIT ?,?;`
    return query(sql, [wallId, (page - 1) * pagesize, pagesize])
}

//查询各反馈总数据
exports.feedbackCount = (wallId, type) => {
    const sql = `SELECT count(*) as count from feedbacks WHERE wallId = ? AND type = ?;`
    return query(sql, [wallId, type])
}

//查询评论总数
exports.commentCount = (wallId) => {
    const sql = `SELECT count(*) as count from comments WHERE wallId = ?;`
    return query(sql, wallId)
}

//是否点赞
exports.isLike = (wallId, userId) => {
    const sql = `SELECT count(*) as count FROM feedbacks WHERE wallId = ? AND userId = ? AND type = 0;`
    return query(sql, [wallId, userId])
}

//根据用户名查找用户
exports.findUserByUserName = (username) => {
    const sql = `SELECT * FROM user WHERE username = ?;`
    return query(sql, username)
}
