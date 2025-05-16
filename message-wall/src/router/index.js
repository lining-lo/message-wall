import { createMemoryHistory, createRouter } from 'vue-router'
import Main from '../views/Main.vue'
import WallMessage from '../views/WallMessage.vue'

const routes = [
    {
        path: '/',
        component: Main,
        name: Main,
        redirect:'/WallMessage',
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
    history: createMemoryHistory(),
    routes,
})
