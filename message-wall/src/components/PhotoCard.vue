<template>
    <div class="photo-card">
        <img class="card-img" :src="`http://localhost:3000/${photo.imgurl}`" alt="">
        <div class="card-background" @click="toDetail"> </div>
        <div class="card-like">
            <svg class="icon" :class="{ addlike: props.photo.isLike[0].count !== 0 }" @click="addLike" aria-hidden="true">
                <use xlink:href="#icon-xiai"></use>
            </svg>
            <span class="count">{{ photo.like[0].count }}</span>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, computed } from 'vue'
import { useStore } from 'vuex';

//获取当前vue实例
const { proxy } = getCurrentInstance()

//获取父组件参数
const props = defineProps(['photo'])

//获取父组件传递的方法
const emit = defineEmits(['toDetail'])

//获取store实例
const store = useStore()

//用户信息
const userInfo = computed(() => store.state.popup.userInfo)

//点击卡片显示详情
const toDetail = () => {
    emit('toDetail')
}

//点赞
const addLike = async () => {
    //点过一次赞不允许再点赞
    if (props.photo.isLike[0].count === 0) {
        //获取参数
        const data = {
            wallId: props.photo.id,
            userId: JSON.parse(userInfo.value).username,
            type: 0,
            moment: new Date()
        }
        //插入一条点赞数据
        const result = await proxy.$api.insertFeedBack(data)
        //界面反馈
        props.photo.like[0].count++
        props.photo.isLike[0].count++
    }
}

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

            &.addlike {
                color: @like;
            }
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