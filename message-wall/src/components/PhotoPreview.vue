<template>
    <transition name="transition-view">
        <div class="photo-preview">
            <div class="preview-background" :class="{ dark: isDark }"></div>
            <div class="preview-img">
                <img :src="`http://localhost:3000/${photos[store.state.popup.selectedCard]}`" alt="">
            </div>
            <div @click="changePhoto(0)" class="preview-switch l-switch">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiangzuo1"></use>
                </svg>
            </div>
            <div @click="changePhoto(1)" class="preview-switch r-switch">
                <svg class="icon" aria-hidden="true">
                    <use xlink:href="#icon-xiangyou1"></use>
                </svg>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useStore } from 'vuex';

//获取父组件传递的参数
const props = defineProps(['photos', 'isDark'])

//获取sotre实例
const store = useStore()

//暗黑模式开关(true暗色，false亮色)
const isDark = computed(() => props.isDark)

//点击切换图片(0上一张，1下一张)
const changePhoto = (choice) => {
    //上一张
    if (choice === 0) {
        //到达第一张图片时不能再切换
        if (store.state.popup.selectedCard <= 0) return
        store.state.popup.selectedCard--
    }
    //下一张
    if (choice === 1) {
        //到达最后一张图片时不能再切换
        if (store.state.popup.selectedCard >= props.photos.length - 1) return
        store.state.popup.selectedCard++
    }
}

</script>
<style lang='less' scoped>
.transition-view {

    //入场
    &-enter {
        &-from {
            opacity: 0;
        }

        &-active {
            transition: all 0.2s ease-out;

        }

        &-to {
            opacity: 1;
        }
    }

    //出场
    &-leave {
        &-from {
            opacity: 1;
        }

        &-active {
            transition: all 0.2s ease-in;

        }

        &-to {
            opacity: 0;
        }
    }
}

.photo-preview {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    .preview-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(20px);

        &.dark {
            background: rgba(28, 37, 49, 0.8);
        }
    }

    .preview-img {
        position: absolute;
        padding: 82px 454px 0 96px;
        box-sizing: border-box;
        overflow-y: auto;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;

        img {
            max-width: 100%;
        }
    }

    .preview-switch {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        background: @gray-3;
        color: @gray-10;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0.5;
        cursor: pointer;
        transition: @tr;

        .icon {
            font-size: 24px;
        }

        &:hover {
            opacity: 1;
        }
    }

    .l-switch {
        left: 20px;
    }

    .r-switch {
        right: 380px;
    }

}
</style>