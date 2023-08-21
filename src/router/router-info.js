import Layout from "@/pages/layout/index.vue"
//静态路由表
export const ROUTERS = [
    {
        path: "/",
        component: Layout,
        name: "HRM",
        meta: {
            title: "商院人力资源管理系统",
            hidden: true,
        },
        children: [
            {
                path: "/",
                component: () => import("@/views/Home"),
            },
        ],
    },
]
