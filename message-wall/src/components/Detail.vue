<template>
    <div class="detail">
        <div class="detail-head">
            <p class="revoke">联系墙主撕掉该便签</p>
            <p class="report">举报</p>
        </div>
        <note-card :note="card" />
        <div class="detail-form">
            <textarea class="text" placeholder="请输入..." />
            <div class="bottom">
                <input class="signature" placeholder="签名" type="text">
                <yk-button>确定</yk-button>
            </div>
        </div>
        <div class="detail-comment">
            <p class="comment-title">评论{{props.card.comment}}</p>
            <div class="comment-item" v-for="(item, index) in commont.data">
                <div class="avatar" :style="{backgroundImage: portrait[item.imgurl]}"></div>
                <div class="content">
                    <div class="userInfo">
                        <p class="name">{{ item.name }}</p>
                        <p class="time">{{ formattime(item.moment) }}</p>
                    </div>
                    <p class="comment">{{ item.message }}</p>
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
import { ref, reactive } from 'vue'

//获取父组件参数
const props = defineProps(['card'])

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