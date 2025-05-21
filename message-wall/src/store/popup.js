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
    isView: false
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
    }
}

export default {
    state,
    mutations
}