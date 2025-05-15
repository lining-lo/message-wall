import { createMemoryHistory, createRouter } from 'vue-router'

import Main from '../views/Main.vue'

const routes = [
    {
        path: '/',
        component: Main
    },
]

export default createRouter({
    history: createMemoryHistory(),
    routes,
})
