<template>
    <div class="user">
        <!-- 登录与注册 -->
        <div class="login" v-if="!token">
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
                <span class="regist" @click="changeFormType(1)" v-if="formType === 0">注册</span>
                <span class="regist" @click="changeFormType(0)" v-if="formType === 1">登录</span>
            </p>
        </div>
        <!-- 个人信息 -->
        <div class="info" v-if="token">
            <div class="info-close">
                <svg class="icon" @click="closeLogin" aria-hidden="true">
                    <use xlink:href="#icon-guanbi"></use>
                </svg>
            </div>
            <p class="info-title">个人信息</p>
            <div class="info-upload">
                <input class="upload-file" id="file" type="file" accept="image/*" @change="uploadFile">
                <div class="upload-icon" v-if="!userData.imgurl">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-tianjia-"></use>
                    </svg>
                </div>
                <img :class="{ cleardark: isDark }" v-if="userData.imgurl" :src="imgurl ? imgurl : `http://localhost:3000/${userData.imgurl}`" alt="">
            </div>
            <div class="info-form">
                <p class="username">
                    <span>用户:</span>
                    <input type="text" v-model="userData.username" readonly style="background-color: ghostwhite;">
                </p>
                <p class="password">
                    <span>密码:</span>
                    <input type="text" v-model="userData.password">
                </p>
                <p class="email">
                    <span>邮箱:</span>
                    <input type="text" v-model="userData.email">
                </p>
            </div>
            <button class="info-submit" @click="updateUser">修改信息</button>
        </div>
    </div>

</template>

<script setup scoped>
import { useStore } from 'vuex';
import { getObjectURL } from '../utils/customize';
import { ref, reactive, getCurrentInstance, computed, onMounted } from 'vue'

//获取父组件的参数
const props = defineProps(['isDark'])

//获取父组件方法
const emit = defineEmits(['toLogin'])

//获取当前vue实例
const { proxy } = getCurrentInstance()

//获取store实例
const store = useStore()

//表单标题(0登录,1注册)
const formTitle = ['登录', '注册']

//操作类型(0登录,1注册)
const formType = ref(0)

//登录|注册表单参数
const form = reactive({
    username: '',
    password: '',
    moment: new Date()
})

//用户信息
const userData = reactive({
    id: 0,
    username: '',
    password: '',
    email: '',
    imgurl: '',
    moment: ''
})

//用户是否登录
const token = computed(() => store.state.popup.token)

//用户信息
const userInfo = computed(() => store.state.popup.userInfo)

//关闭用户关闭弹窗并初始化数据
const closeLogin = () => {
    //关闭弹窗
    emit('toLogin', false)
    //初始化数据
    form.username = ''
    form.password = ''
    form.moment = new Date()
    //初始化表单数据
    formType.value = 0
}

//上传的图片路径
const imgurl = ref('')

//暗黑模式开关(true暗色，false亮色)
const isDark = computed(() => props.isDark)

//挂载
onMounted(() => {
    //获取用户数据
    getUserInfo()
})

//前往注册|登录
const changeFormType = (type) => {
    formType.value = type
    //初始化数据
    form.username = ''
    form.password = ''
    form.moment = new Date()
}

//上传图片
const uploadFile = () => {
    let file = getObjectURL(document.getElementById("file").files[0]);
    imgurl.value = file
}

//提交表单(0登录,1注册)
const submit = async () => {
    //表单校验
    if (form.username === '' || form.password === '') {
        //提示用户并终止程序
        return proxy.$message({ message: '请输入账号密码', type: 'error' })
    }
    //用户登录
    if (formType.value === 0) {
        //发送用户登录请求
        const result = await proxy.$api.findUserByUserNameAndPassword(form)
        //登录失败
        if (result.data.message.length === 0) {
            //提示用户登录失败
            return proxy.$message({ message: '账号或密码错误', type: 'error' })
        }
        //登录成功
        //将用户信息和token存入浏览器
        const userInfo = {
            username: result.data.message[0].username,
            imgurl: result.data.message[0].imgurl,
        }
        store.commit('updateUserInfo', JSON.stringify(userInfo))
        store.commit('updateToken', 'a643366405c513c86ab3657b5e94d399')
        //获取用户信息
        Object.assign(userData, result.data.message[0])
        //提示用户登录成功
        proxy.$message({ message: '登录成功', type: 'success' })
        //关闭弹窗并初始化数据
        closeLogin()
        //刷新页面
        location.reload()
    } else if (formType.value === 1) {
        //注册用户
        //查询是否已注册用户
        await proxy.$api.findUserByUserName(form).then(async result => {
            if (result.data.message.length === 0) {
                //发送注册用户请求
                await proxy.$api.insertUser(form)
                //关闭弹窗并初始化数据
                closeLogin()
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


//更新用户信息
const updateUser = async () => {
    //信息校验
    if (userData.username === '' || userData.password === '') {
        //提示用户注册失败
        return proxy.$message({ message: '密码不能为空', type: 'error' })
    }
    //如果上传了图片
    if (imgurl.value) {
        //将图片转为二进制
        const formData = new FormData()
        formData.append('file', document.getElementById("file").files[0])
        //上传图片
        const uploadResult = await proxy.$api.profile(formData)
        userData.imgurl = uploadResult.data
    }
    //发送更新用户请求
    await proxy.$api.updateUser(userData)
    //重新获取用户信息
    getUserInfo()
    //更新仓库中用户信息
    store.commit('updateUserInfo', JSON.stringify({
        username: userData.username,
        imgurl: userData.imgurl,
    }))
    //关闭弹窗
    emit('toLogin', false)
    //提示用户
    proxy.$message({ message: '修改成功', type: 'success' })
}

//重新获取用户信息
const getUserInfo = async () => {
    //用户已经登录
    if (token) {
        //重新获取用户
        const result = await proxy.$api.findUserByUserName(JSON.parse(userInfo.value))
        Object.assign(userData, result.data.message[0])
    }
}


</script>
<style lang='less'>
.cleardark {
    // 取消样式反转
    filter: invert(1) hue-rotate(180deg);
}

.user {
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

    .info {
        width: 220px;
        height: 320px;
        background: rgba(255, 255, 255, .8);
        box-shadow: 0 6px 20px #0000001a;
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        padding: 0 30px;

        .info-close {
            .icon {
                margin-top: 10px;
                padding: 5px;
                float: right;
                width: 14px;
                height: 14px;
                cursor: pointer;
            }
        }

        .info-title {
            text-align: center;
            margin-left: 20px;
            font-size: 14px;
            color: #3b73f0;
            font-weight: 600;
            padding-top: 30px
        }

        .info-upload {
            position: relative;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            margin: 5px auto;

            .upload-file {
                position: absolute;
                z-index: 10;
                height: 60px;
                width: 60px;
                opacity: 0;
                cursor: pointer;
            }

            .upload-icon {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border: 1px solid #fff;
                border-radius: 30px;
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

            img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
        }

        .info-form {
            width: 230px;
            height: 136px;
            margin: 10px auto;

            p {
                padding: 5px;
            }

            span {
                color: #949494;
                font-size: 15px;
            }

            input {
                padding: 4px;
                margin-left: 16px;
                box-sizing: border-box;
                height: 31px;
                border: 1px solid #949494;
                background: none;
                color: #202020;
                width: 148px;
            }
        }

        .info-submit {
            height: 36px;
            width: 220px;
            box-sizing: border-box;
            padding: 0 20px;
            background-color: rgba(121, 121, 121);
            border: none;
            color: #fff;
            cursor: pointer;
        }
    }
}
</style>