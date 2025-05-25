<template>
    <transition name="down">
        <div class="message" v-if="isShow">
            <div class="tip" :class="type">
                <div class="tip-icon" :class="type">
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="style[type]"></use>
                    </svg>
                </div>
                <span class="tip-text">{{ message }}</span>
            </div>
        </div>
    </transition>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

//获取父组件传递的参数
defineProps({
    message: {
        type: String,
        default: "",
    },
    type: {
        type: String,
        default: "warn",
    }
})

//提示样式
const style = {
    success: '#icon-chenggongyijiejue-',
    warn: '#icon-xinxitishi',
    error: '#icon-guanbi'
}

//是否显示
const isShow = ref(true)

//挂载
onMounted(() => {
    isShow.value = true
    setTimeout(() => {
        isShow.value = false;
    }, 3000)

})

</script>
<style lang='less' scoped>
.down {

    //入场
    &-enter {
        &-from {
            transform: translateY(-30px);
            opacity: 0;
        }

        &-active {
            transition: all 0.3s;
        }

        &-to {
            transform: translateY(0px);
            opacity: 1;
        }
    }

    //出场
    &-leave {
        &-from {
            transform: translateY(0px);
            opacity: 1;
        }

        &-active {
            transition: all 0.3s;
        }

        &-to {
            transform: translateY(-30px);
            opacity: 0;
        }
    }
}

.message {
    width: 100%;
    height: 40px;
    position: fixed;
    z-index: 9999;
    top: 20px;
    line-height: 40px;
    display: flex;
    justify-content: center;

    .tip {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0 20px;
        border-radius: 8px;
        color: @gray-1;
        background: @gray-10;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

        .tip-icon {
            display: flex;
            justify-content: center;
            align-items: center;

            &.error {
                font-size: 12px;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                color: #fff;
                background-color: @error-color;
            }

            &.success {
                color: green;
                font-size: 20px;
            }

            &.warn {
                color: @warning-color;
                font-size: 20px;
            }
        }

        .tip-text {
            margin-left: 4px;
            font-size: 16px;
        }
    }
}
</style>