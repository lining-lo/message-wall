import http from "../utils/request";

export default {
    //新建留言/照片
    insertWall(data) {
        return http.post('/insertWall', data)
    },
    //分页查询墙列表
    findWallPage(params) {
        return http.get('/findWallPage', { params })
    }
}