import { createRouter, createWebHistory } from 'vue-router'
import GetAds from '../components/GetAds.vue'

const routes = [
    {
        path: '/',
        component: GetAds,
    },

]

export default createRouter({
    history: createWebHistory(),
    routes
})
