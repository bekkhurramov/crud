import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layout/MainLayout.vue'
import GetAds from '../components/GetAds.vue'

const routes = [
    {
        path: '/',
        component: MainLayout,
    },
    {
        path: '/crud',
        component: GetAds,
    }
]

export default createRouter({
    history: createWebHistory(),
    routes
})
