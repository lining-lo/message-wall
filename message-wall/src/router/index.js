import { createWebHashHistory, createRouter } from 'vue-router'
import Main from '../views/Main.vue'
import WallMessage from '../views/WallMessage.vue'

const routes = [
    {
        path: '/',
        component: Main,
        name: Main,
        redirect: '/WallMessage?id=0',
        children: [
            {
                path: '/WallMessage',
                name: 'WallMessage',
                component: WallMessage
            }
        ]
    },
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})
