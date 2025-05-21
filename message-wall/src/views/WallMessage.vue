<template>
    <div class="wall-message">
        <p class="title">{{ wallType[wallId].name }}</p>
        <p class="slogan">{{ wallType[wallId].slogan }}</p>
        <!-- 标签选项 -->
        <div class="label">
            <p @click="selectNote(-1)" :class="{ selected: -1 === selectedLable }">全部</p>
            <p @click="selectNote(index)" :class="{ selected: index === selectedLable }"
                v-for="(item, index) in label[wallId]">{{ item }}</p>
        </div>
        <!-- 留言墙墙列表 -->
        <div class="card" v-show="wallId === '0'">
            <note-card :class="{ cardselected: index === store.state.popup.selectedCard }" @click="changeCard(index)"
                class="card-item" :note="item" v-for="(item, index) in note.data" :key="index" />
        </div>
        <!-- 照片墙列表 -->
        <div class="photo" v-show="wallId === '1'">
            <photo-card class="photo-item" @click="changeCard(index)" v-for="(item, index) in photo.data" :photo="item"
                :key="index" />
        </div>
        <!-- 创建按钮 -->
        <div v-show="!store.state.popup.isShow" @click="openPopup" class="add" :style="{ bottom: btnBottom + 'px' }">
            <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-tianjia-"></use>
            </svg>
        </div>
        <!-- 弹窗 -->
        <popup :title="store.state.popup.title">
            <create-card v-if="store.state.popup.selectedCard === -1" />
            <detail :card="note.data[store.state.popup.selectedCard]" v-else />
        </popup>
        <!-- 大图预览 -->
        <photo-preview :photos="photoList" v-show="store.state.popup.isView" />
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { note, photo } from '../../mock/index'
import { wallType, label } from '../utils/data'
import Detail from '../components/Detail.vue'
import CreateCard from '../components/CreateCard.vue'
import Popup from '../components/Popup.vue'
import NoteCard from '../components/NoteCard.vue'
import PhotoCard from '../components/PhotoCard.vue'
import PhotoPreview from '../components/PhotoPreview.vue'
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

//获取rooute实例
const route = useRoute()

//获取router实例
const router = useRouter()

//获取store实例
const store = useStore()

//控制选中的词条
const selectedLable = computed(() => store.state.popup.selectedLable)

//控制按钮位置
const btnBottom = ref(10)

//墙的类型(0留言,1照片)
const wallId = computed(() => route.query.id || '0')

//照片墙的所有照片
const photoList = ref([])

//挂载
onMounted(() => {
    //控制添加按钮位置
    window.addEventListener('scroll', scrollBottom)
    //获取照片墙所有照片
    getPhotoList()
})

//选择词条
const selectNote = (index) => {
    store.commit('updateSelectedLable', index)
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
    } else {
        btnBottom.value = 10
    }
}

//打开添加弹窗
const openPopup = () => {
    store.commit('updateShow', true)
}

//关闭添加弹窗
const closePopup = () => {
    store.commit('updateShow', false)
    store.commit('updateSelectedCard', -1)
}

//点击选择卡片
const changeCard = (index) => {
    const selectedCard = store.state.popup.selectedCard
    console.log(wallId);

    if (index !== selectedCard) {
        if (wallId.value === '1') {
            store.commit('updateView', true)
        }
        store.commit('updateTitle', '')
        store.commit('updateSelectedCard', index)
        openPopup()
    } else {
        if (wallId.value === '1') {
            store.commit('updateView', false)
        }
        store.commit('updateTitle', '写留言')
        closePopup()
    }
}

//获取照片墙的所有照片
const getPhotoList = () => {
    for (let i = 0; i < photo.data.length; i++) {
        photoList.value.push(photo.data[i].imgurl)
    }
}
</script>
<style lang='less' scoped>
.wall-message {
    min-height: 600px;

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
        transition: @tr;

        .card-item {
            margin: 6px;
        }

        .cardselected {
            border: 1px solid @primary-color;
        }
    }

    .photo {
        width: 88%;
        margin: 20px auto;
        columns: 5;
        column-gap: @padding-4;

        .photo-item {
            margin-bottom: @padding-4;
            break-inside: avoid;
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