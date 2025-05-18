<template>
    <div class="wall-message">
        <p class="title">{{ wallType[type].name }}</p>
        <p class="slogan">{{ wallType[type].slogan }}</p>
        <div class="label">
            <p @click="selectNode(index)" :class="{ selected: index === selectedLable }"
                v-for="(item, index) in label[type]">{{ item }}</p>
        </div>
        <div class="card">
            <note-card class="card-item" :note="item" v-for="(item,index) in note.data" :key="index"/>
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

//选择词条
const selectNode = (index) => {
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
    .card{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 20px;
        .card-item{
            margin: 6px;
        }
    }
}
</style>