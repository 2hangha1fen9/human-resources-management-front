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
                component: () => import("@/pages/home/Index.vue"),
            },
        ],
    },
    {
        path: "/system",
        component: Layout,
        redirect: "/system/user",
        meta: {
            title: "系统管理",
            icon: "system",
        },
        children: [
            {
                path: "/system/user",
                meta: {
                    title: "用户管理",
                    icon: "user",
                },
                component: () => import("@/pages/system/user/Index.vue"),
            },
            {
                path: "/system/permission",
                meta: {
                    title: "权限管理",
                    icon: "permission",
                },
                component: () => import("@/pages/system/permission/Index.vue"),
            },
            {
                path: "/system/role",
                meta: {
                    title: "角色管理",
                    icon: "role",
                },
                component: () => import("@/pages/system/role/Index.vue"),
            },
        ],
    },
]
