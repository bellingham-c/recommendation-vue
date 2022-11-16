import {createRouter, createWebHistory} from 'vue-router'
import EIndexView from "@/components/eshop/IndexView";
import CIndexView from "@/components/celebrity/IndexView";
import RegisterPage from "../components/login/RegisterPage"
import LoginPage from '../components/login/LoginPage'

const routes = [
    {
        path: '/',
        name: 'login',
        component: LoginPage
    },
    // 电商路由
    {
        path: '/eindex',
        name: 'index',
        component: EIndexView
    },
    // 网红路由
    {
        path: '/cindex',
        name: 'index',
        component: CIndexView
    },
    // 登录路由

    // 注册路由
    {
        path: '/register',
        name: 'register',
        component: RegisterPage
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    // }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
