import {createRouter, createWebHistory} from 'vue-router'
import EIndexView from "@/components/eshop/IndexView";
import CIndexView from "@/components/celebrity/IndexView";
import RegisterPage from "../components/login/RegisterPage"
import LoginPage from '../components/login/LoginPage'
import IndexMain from '../components/celebrity/children/IndexMain'
import GoodRecommend from '../components/celebrity/children/GoodRecommend'
import FindEshop from "../components/celebrity/children/FindEshop";
import MySelf from '../components/celebrity/children/MySelf'



const routes = [
    {
        path: '/',
        name: 'login',
        component: LoginPage
    },
    // 电商路由
    {
        path: '/eshop',
        name: 'eshop',
        component: EIndexView

    },
    // 网红路由
    {
        path: '/celebrity',
        name: 'celebrity',
        component: CIndexView,
        children:[
            {
                path:'index',
                component:IndexMain
            },
            {
                path:'recommend',
                component: GoodRecommend
            },
            {
                path:'myself',
                component: MySelf
            },
            {
                path:'find',
                component: FindEshop
            }
        ]
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
