<template>
    <div class="wall-message" ref="wallMessage" :class="{ dark: isDark }">
        <div class="wall-background" :class="[{ wallBackground: isDark }, { cleardark: isDark }]">
            <!-- 头部导航 -->
            <top-bar @initWall="initWall" :class="{ cleardark: isDark }" :isDark="isDark" @changeSwitch="changeSwitch"
                @toLogin="toLogin" />
            <!-- 标题信息 -->
            <div class="wall-title" :class="{ cleardark: isDark }">
                <p class="title">{{ wallType[wallId].name }}</p>
                <p class="slogan">{{ wallType[wallId].slogan }}</p>
            </div>
            <!-- 标签选项 -->
            <div class="label" :class="{ cleardark: isDark }">
                <p @click="selectNote(-1)" :class="{ selected: -1 === selectedLable }">全部</p>
                <p @click="selectNote(index)" :class="{ selected: index === selectedLable }"
                    v-for="(item, index) in label[wallId]">{{ item }}</p>
            </div>
            <!-- 留言墙墙列表 -->
            <div class="card" v-show="wallId === '0'" :class="{ cleardark: isDark }">
                <note-card :class="{ cardselected: index === store.state.popup.selectedCard }"
                    @toDetail="changeCard(index)" class="card-item" :note="item" v-for="(item, index) in cardList"
                    :key="index" />
            </div>
            <!-- 照片墙列表 -->
            <div class="photo" v-show="wallId === '1'">
                <photo-card class="photo-item" @toDetail="changeCard(index)" v-for="(item, index) in cardList"
                    :photo="item" :key="index" />
            </div>
            <!-- 卡片的状态 -->
            <div class="none" v-show="isLoading === 0">
                <img class="none-img" :src="getAssetURL(noneTip[parseInt(wallId)].url)" alt="">
                <p class="none-msg">{{ noneTip[parseInt(wallId)].msg }}</p>
            </div>
            <div class="loading" v-show="isLoading === 1">
                <div class="lottie"></div>
            </div>
            <p class="finish" v-show="isLoading === 2">没有更多...</p>
            <!-- 创建按钮 -->
            <div :class="{ cleardark: isDark }" v-show="!store.state.popup.isShow" @click="openPopup" class="add"
                :style="{ bottom: btnBottom + 'px' }">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-tianjia-"></use>
                </svg>
            </div>
            <!-- 弹窗 -->
            <popup :title="store.state.popup.title" :class="{ cleardark: isDark }">
                <create-card :isDark="isDark" v-if="store.state.popup.selectedCard === -1" @getCardList="getCardList"
                    @initCardList="selectNote" />
                <detail :isDark="isDark" :card="cardList[store.state.popup.selectedCard]" :comments="comments"
                    @updateList="updateList" v-else />
            </popup>
            <!-- 大图预览 -->
            <photo-preview :isDark="isDark" :photos="photoList" v-show="store.state.popup.isView" />
            <!-- 用户登录 -->
            <login :isDark="isDark" v-if="isLogin" class="message-login" @toLogin="toLogin"
                :class="{ cleardark: isDark }" />
        </div>
    </div>
</template>

<script setup>
import lottie from 'lottie-web'
import loadingFile from '../assets/images/loading.json';
import { getAssetURL, ipTo10DigitNumber } from '../utils/customize'
import { note, photo } from '../../mock/index'
import { wallType, label, noneTip } from '../utils/data'
import TopBar from '../components/TopBar.vue';
import Detail from '../components/Detail.vue'
import CreateCard from '../components/CreateCard.vue'
import Popup from '../components/Popup.vue'
import NoteCard from '../components/NoteCard.vue'
import PhotoCard from '../components/PhotoCard.vue'
import PhotoPreview from '../components/PhotoPreview.vue'
import Login from '../components/Login.vue';
import { useStore } from 'vuex'
import { ref, reactive, onMounted, computed, nextTick, getCurrentInstance } from 'vue'
import { useRoute, useRouter } from 'vue-router'

//获取当前vue实例
const { proxy } = getCurrentInstance()

//获取rooute实例
const route = useRoute()

//获取router实例
const router = useRouter()

//获取store实例
const store = useStore()

//控制选中的词条
const selectedLable = computed(() => store.state.popup.selectedLable)

//控制按钮位置
const btnBottom = ref(10)

//墙的类型(0留言,1照片)
const wallId = computed(() => store.state.popup.wallType)

//照片墙的所有照片
const photoList = ref([])

//留言墙的所有留言
const cardList = ref([])

//控制卡片的状态(-1初始,0没有卡片,1加载中,2到底了)
const isLoading = ref(1)

//当前页
const page = ref(1)

//分页条数
const pagesize = ref(8)

//所有评论
const comments = ref([])

//暗黑模式开关(true暗色，false亮色)
const isDark = ref(false)

//用户登录弹窗开关
const isLogin = computed(() => store.state.popup.isLogin)

//用户信息
const userInfo = computed(() => store.state.popup.userInfo)

//挂载
onMounted(() => {
    //控制添加按钮位置
    window.addEventListener('scroll', scrollBottom)
    //获取照片墙所有照片
    // getPhotoList()
    //加载动画
    loading()
    //获取墙列表
    getCardList()
    //获取用户
    getUser()
})

//选择词条
const selectNote = (index) => {
    store.commit('updateSelectedLable', index)
    //初始化墙数据
    cardList.value = []
    photoList.value = []
    page.value = 1
    getCardList()
    //关闭弹窗
    store.commit('updateTitle', '写留言')
    store.commit('updateShow', false)
    store.commit('updateSelectedCard', -1)
    store.commit('updateView', false)
    console.log(photoList.value);

}

//控制滚动条滚到到底部时添加按钮的位置
const scrollBottom = () => {
    //距离顶部的高度
    const scrollTop = document.documentElement.scrollTop
    //屏幕高度
    const clientHeight = document.documentElement.clientHeight
    //内容高度
    const scrollHeight = document.documentElement.scrollHeight

    //让添加按钮始终位于footbar上方
    if (scrollTop + clientHeight + 216 >= scrollHeight) {
        btnBottom.value = scrollTop + clientHeight + 216 - scrollHeight
    } else {
        btnBottom.value = 10
    }

    //加载更多
    if (scrollTop + clientHeight + 1 >= scrollHeight) {
        //设置0.8s加载状态
        if (isLoading.value !== 2) {
            isLoading.value = 1
        }
        setTimeout(() => {
            getCardList()
        }, 800);
    }
}

//打开添加弹窗
const openPopup = () => {
    store.commit('updateShow', true)
}

//关闭添加弹窗
const closePopup = () => {
    store.commit('updateShow', false)
    store.commit('updateSelectedCard', -1)
}

//点击选择卡片
const changeCard = (index) => {
    const selectedCard = store.state.popup.selectedCard
    if (index !== selectedCard) {
        if (wallId.value === '1') {
            store.commit('updateView', true)
        }
        store.commit('updateTitle', '')
        store.commit('updateSelectedCard', index)
        openPopup()
        //获取评论列表
        getComments()
    } else {
        if (wallId.value === '1') {
            store.commit('updateView', false)
        }
        store.commit('updateTitle', '写留言')
        closePopup()
    }
}

//获取照片墙的所有照片
// const getPhotoList = () => {
//     for (let i = 0; i < photo.data.length; i++) {
//         photoList.value.push(photo.data[i].imgurl)
//     }
// }

//lottie加载动画
const loading = () => {
    if (isLoading.value === 1) {
        nextTick(async () => {
            const params = {
                container: document.querySelector(".lottie"),//需要渲染的dom
                renderer: "svg",//渲染方式
                loop: true,//是否循环播放
                autoplay: true,//是否自动播放
                animationData: loadingFile,//json文件
            }
            lottie.loadAnimation(params)
        })
    }
}

//获取墙列表
const getCardList = async () => {
    if (page.value > 0) {
        //设置加载状态
        isLoading.value = 1
        //获取请求参数
        const params = {
            page: page.value,
            pagesize: pagesize.value,
            type: parseInt(wallId.value),
            label: selectedLable.value,
            userId: JSON.parse(userInfo.value).username
        }
        //发送请求
        const { data } = await proxy.$api.findWallPage(params)
        //获取墙列表
        cardList.value = cardList.value.concat(data.message)
        // console.log('cardList', cardList.value);
        //单独获取照片路径数组
        if (params.type === 1) {
            for (let i = 0; i < data.message.length; i++) {
                photoList.value.push(data.message[i].imgurl)
            }
            // console.log('photoList', photoList.value);
        }
        //设置下一页
        if (data.message.length) {
            page.value++
        } else {
            page.value = 0
        }
        //设置卡片状态(-1初始,0没有卡片,1加载中,2到底了)
        if (cardList.value.length > 0) {
            isLoading.value = -1
            if (page.value === 0) {
                isLoading.value = 2
            }
        } else {
            isLoading.value = 0
        }
    }
}

//获取用户
const getUser = async () => {
    //没有token
    if (!store.state.popup.token) {
        //获取ip地址并加密
        const { data } = await proxy.$api.getIp()
        //生成游客信息并存入浏览器
        const userInfo = {
            username: '游客' + ipTo10DigitNumber(data.message),
            imgurl: Math.floor(Math.random() * 14),
        }
        store.commit('updateUserInfo', JSON.stringify(userInfo))
    }
}

//获取留言列表
const getComments = async () => {
    //获取评论的参数
    const params = reactive({
        wallId: cardList.value[store.state.popup.selectedCard].id,
        page: 1,
        pagesize: 100
    })
    //发送请求
    const result = await proxy.$api.findCommentPage(params)
    //收集数据
    comments.value = result.data.message
    console.log('comments', comments.value);
}

//发送评论时更新列表
const updateList = () => {
    //重新获取留言列表
    getComments()
    //重新获取卡片列表
    cardList.value = []
    page.value = 1
    getCardList()
}

//切换墙时|关闭弹窗初始化数据
const initWall = () => {
    //选择的标签初始化（全部）
    store.commit('updateSelectedLable', -1)
    //选择的卡片初始化（不选）
    store.commit('updateSelectedCard', -1)
    //关闭大图预览
    store.commit('updateView', false)
    //关闭查看详情
    store.commit('updateShow', false)
    //重新获取卡片列表
    cardList.value = []
    photoList.value = []
    page.value = 1
    getCardList()
}

//切换暗黑模式
const changeSwitch = () => {
    // 设置切换状态
    isDark.value = !isDark.value
}

//打开用户登录弹窗
const toLogin = (key) => {
    //打开弹窗
    store.commit('updateisLogin', key)
}

</script>
<style lang='less' scoped>
.dark {
    // 样式反转
    filter: invert(1) hue-rotate(180deg);
}

.cleardark {
    // 取消样式反转
    filter: invert(1) hue-rotate(180deg);
}

.wallBackground {
    background-image: url(../../static/bg.jpg);
    background-repeat: no-repeat;
    background-attachment: fixed;
    filter: invert(1) hue-rotate(180deg);
}

.wall-message {
    .wall-background {
        min-height: 600px;
        position: relative;
        // .wall-background {
        //     width: 100%;
        //     height: 100%;
        //     position: fixed;
        //     top: 0;
        //     left: 0;
        //     z-index: -1;
        // }

        .wall-title {
            padding-top: 48px;
            padding-bottom: @padding-8;

            .title {
                font-size: 56px;
                color: @gray-1;
                text-align: center;
                font-weight: 600;
            }

            .slogan {
                color: @gray-2;
                text-align: center;
            }
        }

        .label {
            display: flex;
            justify-content: center;
            align-items: center;
            margin-top: 40px;

            p {
                padding: 0 14px;
                margin: @padding-4;
                color: @gray-2;
                box-sizing: border-box;
                cursor: pointer;
            }

            .selected {
                color: @gray-1;
                font-weight: 600;
                border: 1px solid @gray-1;
                border-radius: 16px;
            }
        }

        .card {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            margin-top: 20px;
            transition: @tr;

            .card-item {
                margin: 6px;
                transition: all 0.3s ease;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

                &:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
                }
            }

            .cardselected {
                border: 1px solid @primary-color;
            }
        }

        .photo {
            width: 88%;
            margin: 0 auto;
            margin-top: 20px;
            columns: 5;
            column-gap: @padding-4;

            .photo-item {
                margin-bottom: @padding-4;
                break-inside: avoid;
            }
        }

        .none {
            width: 100%;
            text-align: center;
            padding-top: 70px;
            position: absolute;
            top: 280;

            .none-img {
                margin: 0 auto;
                width: 100px;
            }

            .none-msg {
                font-family: serif;
                font-weight: 700;
                font-size: 18px;
                color: @gray-3;
            }
        }

        .loading {
            width: 100%;

            .lottie {
                height: 150px;
                margin: 0 auto;
            }
        }

        .finish {
            text-align: center;
            color: @gray-3;
            padding: 20px;
        }

        .add {
            width: 56px;
            height: 56px;
            background: @gray-1;
            box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
            border-radius: 28px;
            position: fixed;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: @tr;
            right: 12px;
            cursor: pointer;

            .icon {
                color: @gray-10;
                font-size: 24px;
            }
        }

        .message-login {
            position: fixed;
            z-index: 1111;
            top: 64px;
            right: 12px;
        }
    }
}
</style>