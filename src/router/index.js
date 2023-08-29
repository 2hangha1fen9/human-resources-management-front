import { createRouter, createWebHistory } from "vue-router";

//基础路由
export const baseRoutes = [
    {
        path: "/login",
        component: () => import("@/pages/Login.vue"),
        meta: {
            title: "商院人力资源管理系统",
            hidden: true,
        },
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
];
//创建路由
let router = createRouter({
    history: createWebHistory(),
    routes: baseRoutes,
});

export default router;
