import Layout from "@/pages/layout/index.vue"
//静态路由表
export const ROUTERS = [
    {
        path: "/",
        component: Layout,
        name: "HRM",
        meta: {
            title: "主页",
            hidden: true,
        },
        children: [
            {
                path: "/",
                component: () => import("@/pages/Home/index.vue"),
            },
        ],
    },
]
