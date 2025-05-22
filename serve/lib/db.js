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

//创建留言反馈数据表sql
const feedbacksSql =
    `create table if not exists feedbacks( 
     id INT NOT NULL AUTO_INCREMENT,
     wallId INT NOT NULL COMMENT '墙留言ID',
     userId VARCHAR(100) NOT NULL COMMENT '反馈者ID',
     type INT NOT NULL COMMENT '反馈类型0喜欢1举报2撤销',
     moment VARCHAR(100) NOT NULL COMMENT '时间',
     PRIMARY KEY (  id )
    );`

//创建留言评论数据表sql
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

//创建数据表的方法
const createTable = (sql) => {
    return query(sql, [])
}

//控制先创建数据库再创建表的方法
const create = async() => {
    await createDatabase(createDatabaseSql)
    createTable(wallsSql)
    createTable(feedbacksSql)
    createTable(commentsSql)
}

create()