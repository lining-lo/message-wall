<template>
    <div class="create-card">
        <!-- 颜色列表 -->
        <div class="color-list" v-show="wallId === '0'">
            <div class="color-item" :class="{ colorselected: index === data.color }" @click="changeColor(index)"
                v-for="(item, index) in colors" :key="index" :style="{ background: item }"></div>
        </div>
        <!-- 文件上传 -->
        <div class="card-upload" v-show="wallId === '1'">
            <input class="upload-file" id="file" type="file" accept="image/*" @change="uploadFile">
            <div class="upload-icon">
                <svg class="icon" v-if="data.imgurl === ''" aria-hidden="true">
                    <use xlink:href="#icon-tianjia-"></use>
                </svg>
                <svg class="icon" v-if="data.imgurl !== ''" aria-hidden="true">
                    <use xlink:href="#icon-xiugai"></use>
                </svg>
            </div>
            <div class="upload-img">
                <img :src="data.imgurl">
            </div>
        </div>
        <!-- 留言卡片 -->
        <div class="card-main" :style="{ background: wallId === '0' ? cardColor[data.color] : cardColor[5] }">
            <textarea class="text" v-model="data.message" placeholder="留言..." maxlength="96"></textarea>
            <input class="name" v-model="data.name" type="text" placeholder="作者" readonly>
        </div>
        <!-- 标签列表 -->
        <div class="card-label">
            <p class="title">选择标签</p>
            <div class="label-list">
                <p @click="changeLabel(index)" :class="{ labelselected: index === data.label }" class="label-item"
                    v-for="(item, index) in label[parseInt(wallId)]" :key="index">{{ item }}</p>
            </div>
        </div>
        <!-- 免责声明 -->
        <div class="card-statement">
            <p class="title">免责声明</p>
            <p class="text"> 一刻时光是本人独自开发的，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：<br> 1、反对宪法所确定的基本原则的；<br>
                2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家 统一的；<br> 3、损害国家荣誉和利益的； <br>4、煽动民族仇恨、民族歧视，破坏民族团结的；<br>
                5、破坏国家宗教政策，宣扬邪教和封建迷信的；<br> 6、散布谣言，扰乱社会秩序，破坏社会稳定的；<br> 7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br>
                8、侮辱或者诽谤他人，侵害他人合法权益的；<br> 9、含有法律、行政法规禁止的其他内容的信息。 </p>
        </div>
        <!-- 底部按钮 -->
        <div class="card-foot">
            <yk-button class="cancel" size="max" nom="secondary" @click="colsePopup">丢弃</yk-button>
            <yk-button size="max" class="submit" @click="submit">确定</yk-button>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { getObjectURL } from '../utils/customize';
import { label, cardColor, colors } from '../utils/data';
import YkButton from '../components/YkButton.vue'
import { ref, reactive, computed, onMounted, getCurrentInstance } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex';


//获取当前vue实例
const { proxy } = getCurrentInstance()

//获取父组件的自定义事件
const emit = defineEmits(['getCardList', 'initCardList'])

//获取rooute实例
const route = useRoute()

//获取store实例
const store = useStore()

//墙的类型(0留言,1照片)
const wallId = computed(() => route.query.id || '0')

//卡片数据
const data = reactive({
    //卡片类型(0留言1照片)
    type: parseInt(wallId.value),
    //卡片信息
    message: '',
    //留言者
    name: localStorage.getItem('user'),
    //用户id
    userId: localStorage.getItem('user'),
    //创建时间
    moment: new Date(),
    //选择的卡片标签
    label: 0,
    //选择的卡片颜色
    color: 0,
    //图片路径
    imgurl: ''
})

//挂载
onMounted(() => {

})

//改变卡片颜色
const changeColor = (index) => {
    data.color = index
}

//改变卡片标签
const changeLabel = (index) => {
    data.label = index
}

//上传图片
const uploadFile = () => {
    let file = getObjectURL(document.getElementById("file").files[0]);
    data.imgurl = file
}

//关闭弹窗
const colsePopup = () => {
    store.commit('updateTitle', '写留言')
    store.commit('updateShow', false)
    store.commit('updateSelectedCard', -1)
    store.commit('updateView', false)
}

//创建卡片
const submit = async () => {
    //如果是留言
    if (wallId.value === '0' && data.message) {
        //发送请求
        const result = await proxy.$api.insertWall(data)
        //重新获取墙列表
        emit('initCardList', -1)
        //关闭弹窗
        colsePopup()
        //提示用户
        proxy.$message({ message: '创建成功', type: 'success' })
    } else if (wallId.value === '1' && data.imgurl) {
        //如果是照片 
        //将图片转为二进制
        const formData = new FormData()
        formData.append('file', document.getElementById("file").files[0])
        //上传图片
        const uploadResult = await proxy.$api.profile(formData)
        data.imgurl = uploadResult.data
        //保存到数据库
        const insertResult = await proxy.$api.insertWall(data)
        //重新获取墙列表
        emit('initCardList', -1)
        //关闭弹窗
        colsePopup()
        //提示用户
        proxy.$message({ message: '创建成功', type: 'success' })
    }
}

</script>
<style lang='less' scoped>
.create-card {
    padding: 0 @padding-20 120px;
    position: relative;

    .card-upload {
        padding-bottom: 20px;
        position: relative;
        min-height: 60px;

        .upload-file {
            position: absolute;
            z-index: 10;
            top: -25px;
            height: 90px;
            width: 64px;
            opacity: 0;
            cursor: pointer;
        }

        .upload-icon {
            position: absolute;
            top: 2px;
            left: 2px;
            width: 64px;
            height: 64px;
            border: 1px solid #fff;
            border-radius: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            background: rgba(0, 0, 0, 0.2);

            .icon {
                font-size: 20px;
                color: #fff;
            }
        }

        .upload-img {
            max-height: 200px;
            width: 100%;
            background: #333;
            overflow: hidden;
            display: flex;
            align-items: center;

            img {
                width: 100%;
            }
        }

    }

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