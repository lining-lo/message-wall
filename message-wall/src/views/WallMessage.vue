<template>
    <div class="wall-message">
        <p class="title">{{ wallType[type].name }}</p>
        <p class="slogan">{{ wallType[type].slogan }}</p>
        <div class="label">
            <p @click="selectNode(index)" :class="{ selected: index === selectedLable }"
                v-for="(item, index) in label[type]">{{ item }}</p>
        </div>
        <div class="card">
            <note-card class="card-item" :note="item" v-for="(item, index) in note.data" :key="index" />
        </div>
        <div class="add" :style="{ bottom: btnBottom + 'px' }">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tianjia-"></use>
            </svg>
        </div>
    </div>
</template>

<script setup>
import { note } from '../../mock/index'
import NoteCard from '../components/NoteCard.vue'
import { wallType, label } from '../utils/data'
import { ref, reactive, onMounted } from 'vue'

//控制墙的性质（0留言墙，1照片墙）
const type = ref(0)

//控制选中的词条
const selectedLable = ref(0)

//控制按钮位置
const btnBottom = ref(10)

//挂载
onMounted(() => {
    //控制添加按钮位置
    window.addEventListener('scroll', scrollBottom)
})

//选择词条
const selectNode = (index) => {
    selectedLable.value = index
}

//控制滚动条滚到到底部时添加按钮的位置
const scrollBottom = () => {
    //距离顶部的高度
    const scrollTop = document.documentElement.scrollTop
    //屏幕高度
    const clientHeight = document.documentElement.clientHeight
    //内容高度
    const scrollHeight = document.documentElement.scrollHeight
    if (scrollTop + clientHeight + 216 >= scrollHeight) {
        btnBottom.value = scrollTop + clientHeight + 216 - scrollHeight
    }else{
        btnBottom.value = 10
    }
}

</script>
<style lang='less' scoped>
.wall-message {
    .title {
        padding-top: 48px;
        padding-bottom: @padding-8;
        font-size: 56px;
        color: @gray-1;
        text-align: center;
        font-weight: 600;
    }

    .slogan {
        color: @gray-2;
        text-align: center;
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

        .card-item {
            margin: 6px;
        }
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
}
</style>