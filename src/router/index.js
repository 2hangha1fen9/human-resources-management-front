<<<<<<< HEAD
import { createRouter, createWebHistory } from "vue-router";
import ROUTERS from '@/router/router-info'
//创建路由
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/login",
            component: () => import("@/pages/Login.vue"),
            meta: {
                title: "商院人力资源管理系统",
                hidden: true,
            },
=======
import { createRouter, createWebHistory, createRouterMatcher } from "vue-router"

//基础路由
export const baseRoutes = [
    {
        path: "/login",
        component: () => import("@/pages/Login.vue"),
        meta: {
            title: "商院人力资源管理系统",
            hidden: true,
>>>>>>> 6b69b20160dfbcb7efb28fc81c113b2e4bc31937
        },
    },
    {
        path: "/404",
        component: () => import("@/pages/404.vue"),
        meta: {
            title: "404",
            hidden: true,
        },
<<<<<<< HEAD
        {
            path: "/:catchAll(.*)",
            redirect: "/404",
            meta: {
                hidden: true,
            },
        }, ...ROUTERS
    ],
   
});
=======
    },
    {
        path: "/:catchAll(.*)",
        redirect: "/404",
        meta: {
            hidden: true,
        },
    },
]
//创建路由
let router = createRouter({
    history: createWebHistory(),
    routes: baseRoutes,
})
>>>>>>> 6b69b20160dfbcb7efb28fc81c113b2e4bc31937

export default router
