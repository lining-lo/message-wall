<template>
    <div class="note-card" :style="{backgroundColor: cardColor[note.imgurl]}">
        <div class="top">
            <p class="time">{{formattime(note.moment)}}</p>
            <p class="label">{{label[note.type][note.label]}}</p>
        </div>
        <p class="message">{{ note.message }}</p>
        <div class="bottom">
            <div class="feedback">
                <div class="like">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-xiai"></use>
                    </svg>
                    <span class="value">{{note.like}}</span>
                </div>
                <div class="comment">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-liuyan"></use>
                    </svg>
                    <span class="value">{{note.comment}}</span>
                </div>
            </div>
            <p class="name">{{note.name}}</p>
        </div>
    </div>
</template>

<script setup>
import { label,cardColor } from '../utils/data';
import { formattime } from '../utils/customize';
import { ref, reactive } from 'vue'

//获取笔记
const props = defineProps(['note'])

</script>
<style lang='less' scoped>
@font-face {
    font-family: fa;
    src: url("../assets/fonts/zysxt.ttf");
}
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