const state = {
    //弹窗是否关闭
    isShow: false,
    //选择的卡片
    selectedCard: -1,
    //卡片的标题
    title:'写留言'
}

const mutations = {
    //改变弹窗状态
    updateShow(state, payload) {
        state.isShow = payload
    },
    //改变选择的卡片
    updateSelectedCard(state, payload){
        state.selectedCard = payload
    },
    //改变卡片的标题
    updateTitle(state, payload){
        state.title = payload
    }
}

export default {
    state,
    mutations
}