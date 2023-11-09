import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
import Main from "../pages/Main.vue";
import Profile from "../pages/Profile.vue";
import {store} from "../store";

const routes:Array<RouteRecordRaw>=[
    {
        path: '/',
        name: 'Home',
        component: Main,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,

    },
]


const router = createRouter(({
    history:createWebHistory(import.meta.env.BASE_URL),
    routes,

}))



export default router