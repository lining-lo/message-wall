<template>
    <transition name="modal">
        <div class="popup" v-if="store.state.popup.isShow">
            <div class="popup-head">
                <span class="title">{{ props.title }}</span>
                <svg class="icon" @click="colsePopup" aria-hidden="true">
                    <use xlink:href="#icon-guanbi"></use>
                </svg>
            </div>
            <div class="popup-main">
                <slot class="solt"></slot>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { useStore } from 'vuex';
import { ref, reactive } from 'vue'

//获取父组件的参数
const props = defineProps(['title']);

//获取store实例
const store = useStore()

//关闭弹窗
const colsePopup = () => {
    store.commit('updateTitle', '写留言')
    store.commit('updateShow', false)
    store.commit('updateSelectedCard', -1)
}
</script>
<style lang='less'>
.modal {

    //入场
    &-enter {
        &-from {
            transform: translateX(360px);
        }

        &-active {
            transition: all 0.2s ease-out;

        }

        &-to {
            transform: translateX(0px);
        }
    }

    //出场
    &-leave {
        &-from {
            transform: translateX(0px);
        }

        &-active {
            transition: all 0.2s ease-in;

        }

        &-to {
            transform: translateX(360px);
        }
    }
}

.popup {
    width: 360px;
    height: 100%;
    position: fixed;
    right: 0;
    top: 52px;
    z-index: 1000;
    background: rgba(255, 255, 255, 0.80);
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(5px);

    .popup-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: @padding-20;
        box-sizing: border-box;

        .title {
            font-size: 16px;
            color: @gray-1;
            font-weight: 600;
        }

        .icon {
            color: @gray-2;
            cursor: pointer;
            padding-left: 8px;
        }
    }

    .popup-main {
        height: 100%;
        box-sizing: border-box;
        margin: 2px;
        padding-bottom: 200px;
        overflow: auto;

        .solt {
            height: 1200px;
            background: #eee;
        }

        /* 滚动条样式 */
        &.popup-main::-webkit-scrollbar {
            width: 4px;
            /*  设置纵轴（y轴）轴滚动条 */
            height: 4px;
            /*  设置横轴（x轴）轴滚动条 */
        }

        /* 滚动条滑块（里面小方块） */
        &.popup-main::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background: rgba(0, 0, 0, 0.2);
        }

        /* 滚动条轨道 */
        &.popup-main::-webkit-scrollbar-track {
            border-radius: 4px;
            box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
        }
    }
}
</style>