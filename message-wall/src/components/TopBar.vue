<template>
    <div class="top-bar">
        <!-- logo -->
        <div class="logo">
            <img src="../../public/yksg.svg" alt="">
            <p class="logo-name">一刻时光</p>
        </div>
        <!-- 切换按钮 -->
        <div class="menu">
            <yk-button @click="changeWall('0')" :nom="wallId === '0' ? 'cprimary' : 'csecondary'"
                class="message-wall">留言墙</yk-button>
            <yk-button @click="changeWall('1')" :nom="wallId === '1' ? 'cprimary' : 'csecondary'"
                class="photo-wall">照片墙</yk-button>
        </div>
        <!-- 暗黑模式切换和用户 -->
        <div class="right">
            <!-- 暗黑模式开关 -->
            <div class="right-change" :class="{ cleardark: isDark }"
                :style="{ backgroundColor: isDark ? '#ffcc58' : 'gray' }">
                <div class="switch" :style="{ float: isDark ? 'right' : 'left' }" @click="changeSwitch"></div>
            </div>
            <!-- 用户头像 -->
            <div class="right-user">
                <img :class="{ cleardark: isDark }" v-if="token" :src="`http://localhost:3000/${JSON.parse(userInfo).imgurl}`" @click="toLogin" alt="">
                <div class="bg" @click="toLogin" :style="{ background: portrait[JSON.parse(userInfo).imgurl] }" v-else>
                </div>
                <p class="logout" v-if="token" @click="logout">退出</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ipTo10DigitNumber } from '../utils/customize';
import { portrait } from '../utils/data';
import { useRoute, useRouter } from 'vue-router';
import YkButton from './YkButton.vue';
import { ref, reactive, computed, getCurrentInstance } from 'vue'
import { useStore } from 'vuex';

//获取父组件的参数
const props = defineProps(['isDark'])

//获取父组件方法
const emit = defineEmits(['initWall', 'changeSwitch', 'toLogin'])

//获取当前vue实例
const { proxy } = getCurrentInstance()

//获取store实例
const store = useStore()

//获取route实例
const route = useRoute()

//获取router实例
const router = useRouter()

//墙选中状态(0留言，1照片)
const wallId = computed(() => store.state.popup.wallType)

//暗黑模式开关(true暗色，false亮色)
const isDark = computed(() => props.isDark)

//用户是否登录
const token = computed(() => store.state.popup.token)

//用户信息
const userInfo = computed(() => store.state.popup.userInfo)

//切换留言墙和照片墙
const changeWall = (id) => {
    //滚动条置顶
    document.documentElement.scrollTop = 0
    //改变墙的类型
    store.commit('updateWallType', id)
    //跳转
    router.push('/WallMessage?id=' + id)
    //初始化数据
    emit('initWall')
}

//切换暗黑模式
const changeSwitch = () => {
    emit('changeSwitch')
}

//打开用户登录弹窗
const toLogin = () => {
    emit('toLogin', true)
}

//退出登录
const logout = async() => {
    //清除token
    store.commit('clearToken')
    //清除用户信息
    //获取ip地址并加密
    const { data } = await proxy.$api.getIp()
    //生成游客信息并存入浏览器
    const userInfo = {
        username: '游客' + ipTo10DigitNumber(data.message),
        imgurl: Math.floor(Math.random() * 14),
    }
   //刷新页面
   location.reload()
}

</script>

<style lang='less' scoped>
.cleardark {
    // 取消样式反转
    filter: invert(1) hue-rotate(180deg);
}

.top-bar {
    width: 100%;
    height: 52px;
    background-color: rgba(255, 255, 255, 0.80);
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    position: sticky;
    top: 0;
    left: 0;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
    box-sizing: border-box;

    .logo {
        display: flex;
        align-items: center;
        width: 200px;

        .logo-name {
            font-size: 20px;
            color: @gray-1;
            font-weight: 600;
            padding-left: 10px;
        }
    }

    .menu {
        .message-wall {
            cursor: pointer;
            margin-right: 24px;
        }

        .photo-wall {
            cursor: pointer;
        }
    }

    .right {
        width: 130px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .right-change {
            width: 54px;
            height: 30px;
            background-color: gray;
            // background-color: #ffcc58;
            float: left;
            border-radius: 20px;
            box-sizing: border-box;
            padding: 4px;
            transition: @tr;

            .switch {
                width: 22px;
                height: 22px;
                border-radius: 50%;
                background-color: #fefefe;
                box-shadow: 0 0 0px 2px #fefefe;
                cursor: pointer;
            }
        }

        .right-user {
            position: relative;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #9d6f6f;
            float: right;
            cursor: pointer;
            transition: @tr;

            &:hover .logout {
                opacity: 1;
            }

            .bg {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }

            .logout {
                position: absolute;
                top: 46px;
                left: -4px;
                width: 28px;
                background: rgba(255, 255, 255, .8);
                text-align: center;
                padding: 8px 12px;
                border-radius: 8px;
                box-shadow: 0 4px 12px #0000001a;
                cursor: pointer;
                opacity: 0;
            }
        }
    }
}
</style>