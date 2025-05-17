<template>
    <div class="wall-message">
        <p class="title">{{ wallType[type].name }}</p>
        <p class="slogan">{{ wallType[type].slogan }}</p>
        <div class="label">
            <p @click="selectNode(index)" :class="{ selected: index === selectedLable }" v-for="(item,index) in label[type]">{{ item }}</p>
        </div>
        <div class="card">
            <node-card />
        </div>
    </div>
</template>

<script setup>
import NodeCard from '../components/NodeCard.vue'
import { wallType, label } from '../utils/data'
import { ref, reactive } from 'vue'

//控制墙的性质（0留言墙，1照片墙）
const type = ref(0)

//控制选中的词条
const selectedLable = ref(0)

//选择词条
const selectNode = (index)=>{
    selectedLable.value = index
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
}
</style>