const state = {
    //是否显示弹窗
    isShow: false,
    //选择的卡片
    selectedCard: -1,
    //选中的词条(默认-1为全部)
    selectedLable: -1,
    //卡片的标题
    title: '写留言',
    //是否打开大图预览
    isView: false,
    //墙选中状态(0留言，1照片)
    wallType: '0',
    //登录弹窗的开关
    isLogin: false,
    //token
    token: localStorage.getItem('token') || null,
    //用户信息
    userInfo: localStorage.getItem('userInfo') || JSON.stringify({
        username: '游客' + Math.floor(Math.random() * 100000000),
        imgurl: Math.floor(Math.random() * 14),
    })
}

const mutations = {
    //改变弹窗状态
    updateShow(state, payload) {
        state.isShow = payload
    },
    //改变选择的卡片
    updateSelectedCard(state, payload) {
        state.selectedCard = payload
    },
    //改变选择的词条
    updateSelectedLable(state, payload) {
        state.selectedLable = payload
    },
    //改变卡片的标题
    updateTitle(state, payload) {
        state.title = payload
    },
    //打开与关闭大图预览
    updateView(state, payload) {
        state.isView = payload
    },
    //改变墙的类型
    updateWallType(state, payload) {
        state.wallType = payload
    },
    //改变登录弹窗开启与关闭
    updateisLogin(state, payload) {
        state.isLogin = payload
    },
    //修改token
    updateToken(state, payload) {
        state.token = payload
        localStorage.setItem('token', payload)
    },
    //清除token
    clearToken(state, payload) {
        state.token = null
        localStorage.removeItem('token')
    },
    //修改用户信息
    updateUserInfo(state, payload) {
        state.userInfo = payload
        localStorage.setItem('userInfo', payload)
    },
    //清除用户信息
    clearUserInfo(state, payload) {
        localStorage.removeItem('userInfo')
        state.userInfo = JSON.stringify(payload)
    }
}

export default {
    state,
    mutations
}