import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'
import sendMessage from './components/message/index.js'

const app = createApp(App)

//在vue实例绑定属性
app.config.globalProperties.$api = api
app.config.globalProperties.$message = sendMessage

app.use(router)
app.use(store)

app.mount('#app')
