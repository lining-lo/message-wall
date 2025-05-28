<template>
    <div class="top-bar">
        <div class="logo">
            <img src="../../public/yksg.svg" alt="">
            <p class="logo-name">一刻时光</p>
        </div>
        <div class="menu">
            <yk-button @click="changeWall('0')" :nom="wallId === '0' ? 'cprimary' : 'csecondary'"
                class="message-wall">留言墙</yk-button>
            <yk-button @click="changeWall('1')" :nom="wallId === '1' ? 'cprimary' : 'csecondary'"
                class="photo-wall">照片墙</yk-button>
        </div>
        <div class="user">
            <div class="user-head"></div>
        </div>
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import YkButton from './YkButton.vue';
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex';

//获取父组件方法
const emit = defineEmits('initWall')

//获取store实例
const store = useStore()

//获取route实例
const route = useRoute()

//获取router实例
const router = useRouter()

//墙选中状态(0留言，1照片)
const wallId = computed(()=> store.state.popup.wallType)

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

</script>

<style lang='less' scoped>
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

    .user {
        width: 200px;

        .user-head {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #9d6f6f;
            float: right;
        }
    }
}
</style>