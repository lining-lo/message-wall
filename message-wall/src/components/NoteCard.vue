<template>
    <div class="note-card" :style="{ backgroundColor: cardColor[note.color] }">
        <div class="top">
            <p class="time">{{ formattime(note.moment) }}</p>
            <p class="label">{{ label[note.type][note.label] }}</p>
        </div>
        <p class="message" @click="toDetail">{{ note.message }}</p>
        <div class="bottom">
            <div class="feedback">
                <div class="like">
                    <svg class="icon" @click="addLike" :class="{ addlike: props.note.isLike[0].count !== 0 }" aria-hidden="true">
                        <use xlink:href="#icon-xiai"></use>
                    </svg>
                    <span class="value">{{ note.like[0].count }}</span>
                </div>
                <div class="comment">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-liuyan"></use>
                    </svg>
                    <span class="value">{{ note.commentCount[0].count }}</span>
                </div>
            </div>
            <p class="name">{{ note.name }}</p>
        </div>
    </div>
</template>

<script setup>
import { label, cardColor } from '../utils/data';
import { formattime } from '../utils/customize';
import { ref, reactive, getCurrentInstance } from 'vue'

//获取当前vue实例
const { proxy } = getCurrentInstance()

//获取父组件传递的参数
const props = defineProps(['note'])

//获取父组件传递的方法
const emit = defineEmits(['toDetail'])

//是否点赞
const isLike = ref(props.note.isLike[0].count)

//点击卡片显示详情
const toDetail = () => {
    emit('toDetail')
}

//点赞
const addLike = async () => {
        //点过一次赞不允许再点赞
        if (props.note.isLike[0].count === 0) {
        //获取参数
        const data = {
            wallId: props.note.id,
            userId: localStorage.getItem('user'),
            type: 0,
            moment: new Date()
        }
        //插入一条点赞数据
        const result = await proxy.$api.insertFeedBack(data)
        //界面反馈
        props.note.like[0].count++
        props.note.isLike[0].count++
    }
    console.log(props.note);
    
}

</script>
<style lang='less' scoped>
.note-card {
    width: 320px;
    height: 240px;
    background-color: #f5d8d7;
    padding: 10px 20px 60px;
    box-sizing: border-box;
    position: relative;

    .top {
        display: flex;
        justify-content: space-between;
        padding-bottom: 16px;

        p {
            font-size: @size-12;
            color: @gray-3;
        }
    }

    .message {
        height: 140px;
        font-family: fa;
        font-size: 15px;
        color: @gray-2;
        cursor: pointer;
    }

    .bottom {
        display: flex;
        justify-content: space-between;
        position: absolute;
        bottom: 16px;
        left: 0;
        padding: 0 @padding-20;
        box-sizing: border-box;
        width: 100%;

        .feedback {
            display: flex;
            align-items: center;

            .like {
                padding-right: @padding-8;

                .icon {
                    cursor: pointer;
                    transition: @tr;
                    font-size: @size-16;
                    color: @gray-3;

                    &.addlike {
                        color: @like;
                    }

                    &:hover {
                        color: @like;

                    }
                }

                .value {
                    font-size: @size-12;
                    color: @gray-3;
                    line-height: 16px;
                    padding-left: @padding-4;
                }
            }

            .comment {
                .icon {
                    font-size: @size-16;
                    color: @gray-3;

                }

                .value {
                    font-size: @size-12;
                    color: @gray-3;
                    line-height: 16px;
                    padding-left: @padding-4;
                }
            }
        }

        .name {
            font-family: fa;
            font-size: @size-16;
            color: @gray-1;
        }
    }
}
</style>