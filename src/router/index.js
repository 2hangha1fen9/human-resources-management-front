import { createRouter, createWebHistory } from "vue-router"

//基础路由
export const baseRoutes = [
    {
        path: "/identity",
        component: () => import("@/pages/identity/Index.vue"),
        redirect: "/identity/login",
        meta: {
            title: "商院人力资源管理系统",
            hidden: true,
        },
        children: [
            {
                path: "/identity/login",
                component: () => import("@/pages/identity/Login.vue"),
            },
            {
                path: "/identity/forget",
                component: () => import("@/pages/identity/ForgetPassword.vue"),
            },
        ],
    },
    {
        path: "/404",
        component: () => import("@/pages/404.vue"),
        meta: {
            title: "404",
            hidden: true,
        },
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

export default router
