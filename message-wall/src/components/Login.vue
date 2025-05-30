<template>
    <div class="login">
        <div class="login-close">
            <svg class="icon" @click="closeLogin" aria-hidden="true">
                <use xlink:href="#icon-guanbi"></use>
            </svg>
        </div>
        <p class="login-welcome">欢迎{{ formTitle[formType] }}</p>
        <p class="login-title">留言墙</p>
        <div class="login-form">
            <input type="text" v-model="form.username" placeholder="用户">
            <input class="password" v-model="form.password" type="password" placeholder="密码">
        </div>
        <button class="login-submit" @click="submit">{{ formTitle[formType] }}</button>
        <p class="login-bottom">
            <span class="forget">忘记密码?</span>
            <span class="regist" @click="toRegist">{{ formType === 0 ? '注册' : '登录' }}</span>
        </p>
    </div>
</template>

<script setup scoped>
import { ref, reactive, getCurrentInstance } from 'vue'

//获取父组件方法
const emit = defineEmits(['toLogin'])

//获取当前vue实例
const { proxy } = getCurrentInstance()

//表单标题(0登录,1注册,找回密码)
const formTitle = ['登录', '注册', '找回密码']

//操作类型(0登录,1注册,2找回密码)
const formType = ref(0)

//表单参数
const form = reactive({
    username: '',
    password: '',
    moment: new Date()
})

//关闭用户登录弹窗
const closeLogin = () => {
    emit('toLogin', false)
}

//前往注册
const toRegist = () => {
    formType.value === 0 ? formType.value = 1 : formType.value = 0
}

//提交表单(0登录,1注册,2找回密码)
const submit = async () => {
    //表单校验
    for (const key in form) {
        if (typeof form[key] === 'string' && form[key].trim() === '') {
            return
        }
    }
    //用户登录
    if (formType.value === 0) {

    } else if (formType.value === 1) {
        //注册用户
        //查询是否已注册用户
        await proxy.$api.findUserByUserName(form).then(async result => {
            if (result.data.message.length === 0) {
                //注册用户
                await proxy.$api.insertUser(form)
                //提示用户注册成功
                proxy.$message({ message: '注册成功', type: 'success' })
            } else {
                //提示用户注册失败
                return proxy.$message({ message: '账号已注册', type: 'error' })
            }

        })
    } else {
        //找回密码
    }
}

</script>
<style lang='less'>
.login {
    width: 220px;
    height: 320px;
    background: rgba(255, 255, 255, .8);
    box-shadow: 0 6px 20px #0000001a;
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    text-align: center;
    padding: 0 30px;

    .login-close {
        .icon {
            margin-top: 10px;
            padding: 5px;
            float: right;
            width: 14px;
            height: 14px;
            cursor: pointer;
        }
    }

    .login-welcome {
        margin-left: 20px;
        font-size: 14px;
        color: #3b73f0;
        font-weight: 600;
        padding-top: 30px
    }

    .login-title {
        padding: 4px 0 8px;
        font-size: 24px;
        font-weight: 600;
    }

    .login-form {
        margin-top: 12px;
        width: 100%;

        input {
            box-sizing: border-box;
            padding: 8px;
            height: 36px;
            border: 1px solid #949494;
            background: none;
            color: #202020;
            text-align: center;
        }

        .password {
            margin-top: 12px;
        }
    }

    .login-submit {
        margin-top: 30px;
        height: 36px;
        width: 182px;
        box-sizing: border-box;
        padding: 0 20px;
        background-color: rgba(121, 121, 121);
        border: none;
        color: #fff;
        cursor: pointer;
    }

    .login-bottom {
        width: 182px;
        display: flex;
        justify-content: space-between;
        padding-top: 12px;
        margin-left: 18px;

        .forget {
            cursor: pointer;
            color: #949494;
        }

        .regist {
            cursor: pointer;
            color: #1890ff;
        }
    }

}
</style>