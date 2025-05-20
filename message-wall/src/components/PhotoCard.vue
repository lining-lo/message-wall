<template>
    <div class="photo-card">
        <img class="card-img" :src="`../../static/${photo.imgurl}.jpg`" alt="">
        <div class="card-background"> </div>
        <div class="card-like">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-xiai"></use>
            </svg>
            <span class="count">{{photo.like}}</span>
        </div>
    </div>
</template>

<script setup>
//获取父组件参数
const props = defineProps(['photo'])

</script>
<style lang='less' scoped>
.photo-card {
    position: relative;

    .card-img {
        width: 100%;
    }

    .card-background {
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.2);
        height: 100%;
        width: 100%;
        opacity: 0;
        transition: @tr;
        cursor: pointer;
    }

    .card-like {
        position: absolute;
        left: @padding-8;
        top: @padding-8;
        background: rgba(255, 255, 255, 0.80);
        border-radius: 20px;
        height: 28px;
        padding: 0 10px;
        display: flex;
        align-items: center;
        backdrop-filter: blur(10px);
        opacity: 0;
        transition: @tr;
        cursor: pointer;

        .icon {
            color: @gray-3;
            padding-right: @padding-4;
        }

        .count {
            color: @gray-1;
        }
    }

    &:hover {
        .card-background {
            opacity: 1;
        }

        .card-like {
            opacity: 1;

        }
    }
}
</style>