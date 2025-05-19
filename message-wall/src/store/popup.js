const state = {
    //弹窗是否关闭
    isShow: false,
}

const mutations = {
    //改变弹窗状态
    updateShow(state) {
        state.isShow = !state.isShow
    }
}

export default {
    state,
    mutations
}