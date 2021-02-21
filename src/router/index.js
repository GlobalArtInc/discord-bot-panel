import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                name: 'Home',
                component: () => import('../views/Home')
            }
        ]
    },
    {
        path: '/server',
        component: Layout,
        children: [
            {
                path: ":id",
                name: 'Server',
                component: () => import('../views/Server.vue')
            }
        ]
    },
    {
        path: '*',
        redirect: '/'
    }
]

const router = new VueRouter({
    mode: process.env.NODE_ENV === 'github' ? 'hash' : 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
