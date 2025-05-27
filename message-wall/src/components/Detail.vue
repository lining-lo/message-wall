<template>
    <div class="detail">
        <!-- 头部按钮 -->
        <div class="detail-head">
            <p class="revoke">联系墙主撕掉该便签</p>
            <p class="report">举报</p>
        </div>
        <!-- 留言卡片 -->
        <note-card :note="card" />
        <!-- 评论表单 -->
        <div class="detail-form">
            <textarea class="text" v-model="data.comment" placeholder="请输入..." />
            <div class="bottom">
                <input class="signature" v-model="data.name" placeholder="签名" readonly type="text">
                <yk-button class="submit" :class="{ disabled: !isAllow }" @click="submit">发送</yk-button>
            </div>
        </div>
        <!-- 评论区 -->
        <div class="detail-comment">
            <p class="comment-title">评论{{ props.card.comment }}</p>
            <div class="comment-item" v-for="(item, index) in comments">
                <div class="avatar" :style="{ backgroundImage: portrait[item.imgurl] }"></div>
                <div class="content">
                    <div class="userInfo">
                        <p class="name">{{ item.name }}</p>
                        <p class="time">{{ formattime(item.moment) }}</p>
                    </div>
                    <p class="comment">{{ item.comment }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { formattime } from '../utils/customize';
import { portrait } from '../utils/data';
import { commont } from '../../mock';
import YkButton from './YkButton.vue';
import NoteCard from './NoteCard.vue';
import { ref, reactive, computed, getCurrentInstance, onMounted } from 'vue'
import { useRoute } from 'vue-router';

//获取当前vue实例
const { proxy } = getCurrentInstance()

//获取父组件参数
const props = defineProps(['card','comments'])

//获取父组件方法
const emit = defineEmits(['updateList'])

//获取rooute实例
const route = useRoute()

//墙的类型(0留言,1照片)
const wallType = computed(() => route.query.id || '0')

//发送评论的参数
const data = reactive({
    wallId: props.card.id,
    userId: localStorage.getItem('user'),
    imgurl: props.card.imgurl,
    comment: '',
    name: localStorage.getItem('user'),
    moment: new Date()
})

//控制是否允许发送
const isAllow = computed(() => data.comment ? true : false)

//挂载
onMounted(()=>{

})

//发送评论
const submit = async () => {
    if (isAllow.value) {
        await proxy.$api.insertComment(data)
        //更新留言列表
        emit('updateList')
        //清空信息
        data.comment = ''
    }
}


</script>
<style lang='less' scoped>
.detail {
    position: relative;
    padding: 0 @padding-20;

    .detail-head {
        position: fixed;
        top: 0;
        left: 0;
        padding: @padding-20;
        display: flex;

        .revoke {
            color: @primary-color;
            cursor: pointer;
            padding-right: 30px;
            font-size: @size-16;
        }

        .report {
            font-size: @size-16;
            color: @warning-color;
            cursor: pointer;
        }
    }

    .detail-form {
        .text {
            background: none;
            height: 56px;
            border: 1px solid rgba(148, 148, 148, 1);
            resize: none;
            padding: @padding-8;
            box-sizing: border-box;
            width: 100%;
            margin-top: @padding-12;
        }

        .bottom {
            display: flex;
            padding-top: 6px;
            justify-content: space-between;

            .signature {
                width: 200px;
                box-sizing: border-box;
                padding: 7px;
                background: none;
                border: 1px solid rgba(148, 148, 148, 1);
                line-height: 20px;
            }

            .submit {
                cursor: pointer;

                &.disabled {
                    cursor: not-allowed;
                }
            }
        }
    }

    .detail-comment {
        margin-top: 30px;

        .comment-title {
            padding-bottom: 20px;
            font-size: 16px;
            font-weight: 500;
        }

        .comment-item {
            display: flex;
            padding-bottom: 30px;

            .avatar {
                flex: none;
                width: 28px;
                height: 28px;
                border-radius: 20px;
                overflow: hidden;
                background-color: skyblue;
            }

            .content {
                padding-left: @padding-8;

                .userInfo {
                    display: flex;
                    align-self: center;


                    .name {
                        font-weight: 600;
                    }

                    .time {
                        font-size: @size-12;
                        padding-left: @padding-4;
                        color: @gray-3;
                    }
                }

                .comment {
                    padding-top: @padding-4;
                }
            }
        }
    }
}
</style>