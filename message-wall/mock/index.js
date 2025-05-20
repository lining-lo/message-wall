//引入mock
import Mock from 'mockjs'

//留言note
export const note = Mock.mock({
    'data|20': [{
        //创建时间
        'moment': new Date(),
        //id
        "id|+1": 1,
        //userid
        'userid|+1': 10,
        //内容
        'message|24-96': '@cword',
        //label
        'label|0-10': 0,
        //name
        'name': '@cname',
        //like
        'like|0-120': 0,
        'comment|0-20': 0,
        //背景色
        'imgurl|0-4': 0,
        //是否撤销
        'revoke|0-20': 0,
        //是否举报
        'report|0-20': 0,
        'type': 0
    }]
})

//评论
export const commont = Mock.mock({
    "data|19": [{
        //创建时间
        "moment": new Date(),
        //id
        "id|+1": 1,
        //userid
        "userId|+1": 10,
        //内容
        "message|24-96": "@cword",
        //name
        "name": "@cname",
        //背景色
        "imgurl|0-13": 0,
    }]
})

//照片photo
export const photo = Mock.mock({
    "data|15":[{
        //创建时间
        "moment": new Date(),
        //id
        "id|+1":1,
        //userid
        "userId|+1":10,
        //内容
        "message|24-96":"@cword",
        //label
        "label|0-10":0,
        //name
        "name":"@cname",
        //like
        "like|0-120":0,
        //评论
        "comment|0-120":0,
        //背景色
        "imgurl|0-4":0,
        //是否撤销
        "revoke|0-20":0,
        //是否举报
        "report|0-20":0,
        //类型
        "type":1,
    }]
})