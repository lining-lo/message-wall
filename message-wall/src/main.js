import { createApp } from 'vue'
import './styles/style.css'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api'


const app = createApp(App)

//在实例绑定属性
app.config.globalProperties.$api = api

app.use(router)
app.use(store)

app.mount('#app')
