<template>
    <div class="create-card">
        <div class="color-list">
            <div class="color-item" :class="{ colorselected: index === selectedColor }" @click="changeColor(index)"
                v-for="(item, index) in colors" :key="index" :style="{ background: item }"></div>
        </div>
        <div class="card-main" :style="{ background: cardColor[selectedColor] }">
            <textarea class="text" placeholder="留言..." maxlength="96"></textarea>
            <input class="name" type="text" placeholder="作者">
        </div>
        <div class="card-label">
            <p class="title">选择标签</p>
            <div class="label-list">
                <p @click="changeLabel(index)" :class="{ labelselected: index === selectedLabel }" class="label-item"
                    v-for="(item, index) in label[0]" :key="index">{{ item }}</p>
            </div>
        </div>
        <div class="card-statement">
            <p class="title">免责声明</p>
            <p class="text"> 一刻时光是本人独自开发的，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：<br> 1、反对宪法所确定的基本原则的；<br>
                2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家 统一的；<br> 3、损害国家荣誉和利益的； <br>4、煽动民族仇恨、民族歧视，破坏民族团结的；<br>
                5、破坏国家宗教政策，宣扬邪教和封建迷信的；<br> 6、散布谣言，扰乱社会秩序，破坏社会稳定的；<br> 7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br>
                8、侮辱或者诽谤他人，侵害他人合法权益的；<br> 9、含有法律、行政法规禁止的其他内容的信息。 </p>
        </div>
        <div class="card-foot">
            <yk-button class="cancel" size="max" nom="secondary">丢弃</yk-button>
            <yk-button size="max" class="submit" @click="test">确定</yk-button>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import YkButton from '../components/YkButton.vue'
import { label, cardColor, colors } from '../utils/data';
import { ref, reactive } from 'vue'

//选择的卡片颜色
const selectedColor = ref(0)

//选择的卡片标签
const selectedLabel = ref(0)

//改变卡片颜色
const changeColor = (index) => {
    selectedColor.value = index
}

//改变卡片标签
const changeLabel = (index) => {
    selectedLabel.value = index
}

//测试接口
const test = () => {
    axios.get('http://localhost:3000/findWallPage', {
        params: {
            type: 1,
            label:-1,
            page: 1,
            pagesize: 3
        }
    }).then(result => {
        console.log(result);
    })
}

</script>
<style lang='less'>
.create-card {
    padding: 0 @padding-20 120px;
    position: relative;

    .color-list {
        padding-bottom: @padding-12;
        display: flex;
        align-items: center;
        box-sizing: border-box;

        .color-item {
            width: 24px;
            height: 24px;
            margin-right: @padding-8;
            cursor: pointer;
        }

        .colorselected {
            border: 2px solid @primary-color;
        }
    }

    .card-main {
        width: 100%;
        height: 240px;
        padding: 12px;
        box-sizing: border-box;
        transition: @tr;

        .text {
            background: none;
            border: none;
            resize: none;
            padding: @padding-8;
            box-sizing: border-box;
            height: 172px;
            width: 100%;
            font-family: fa;
            font-size: 16px;
        }

        .name {
            width: 100%;
            box-sizing: border-box;
            padding: @padding-8;
            background: none;
            border: #fff 1px solid;
            line-height: 20px;
            font-family: fa;
            font-size: 16px;
        }
    }

    .card-label {
        margin-top: 20px;

        .title {
            color: @gray-1;
            font-weight: 600;
            padding-top: 30px;
        }

        .label-list {
            display: flex;
            flex-wrap: wrap;
            width: 320px;

            .label-item {
                padding: 2px 10px;
                border-radius: 20px;
                margin: 16px @padding-4 0 0;
                cursor: pointer;
                color: @gray-2;
                transition: @tr;
            }

            .labelselected {
                font-weight: 600;
                color: @gray-1;
                background-color: rgb(187, 165, 165);
            }
        }
    }

    .card-statement {
        padding-top: 10px;
        color: @gray-3;

        .title {
            color: @gray-1;
            font-weight: 600;
            padding-top: 30px;
        }

        .text {
            font-size: 12px;
            padding-top: 20px;
        }
    }

    .card-foot {
        padding: @padding-20;
        box-sizing: border-box;
        position: fixed;
        bottom: 52px;
        left: 0;
        background: rgba(255, 255, 255, 0.6);
        width: 100%;
        backdrop-filter: blur(10px);

        .cancel {
            cursor: pointer;
        }

        .submit {
            margin-left: @padding-20;
            width: 200px;
            cursor: pointer;
        }
    }
}
</style>