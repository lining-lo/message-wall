<template>
    <div class="top-bar">
        <div class="logo">
            <img src="../../public/yksg.svg" alt="">
            <p class="logo-name">一刻时光</p>
        </div>
        <div class="menu">
            <yk-button nom="cprimary" size="max" class="message-wall" >留言墙</yk-button>
            <yk-button nom="csecondary" size="small" class="photo-wall">照片墙</yk-button>
        </div>
        <div class="user">
            <div class="user-head"></div>
        </div>
    </div>
</template>

<script setup>
import YkButton from './YkButton.vue';
import { ref, reactive } from 'vue'

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
    z-index: 9999;
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

    .menu{
        .message-wall{
            margin-right: 24px;
        }
    }

    .user{
        width: 200px;
        .user-head{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background-color: #9d6f6f;
            float: right;
        }
    }
}
</style>