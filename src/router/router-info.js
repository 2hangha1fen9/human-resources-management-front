import Layout from "@/pages/layout/index.vue"

//静态路由表
const ROUTERS = [
    {
        path: "/",
        component: Layout,
        name: "主页",
        meta: {
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
        name: "系统管理",
        meta: {
            icon: "system",
        },
        children: [
            {
                path: "/system/user",
                name: "用户管理",
                meta: {
                    icon: "user",
                },
                component: () => import("@/pages/system/user/Index.vue"),
            },
            {
                path: "/system/role",
                name: "角色管理",
                meta: {
                    icon: "role",
                },
                component: () => import("@/pages/system/role/Index.vue"),
            },
            {
                path: "/system/permission",
                name: "权限管理",
                meta: {
                    icon: "permission",
                },
                component: () => import("@/pages/system/permission/Index.vue"),
            },
        ],
    },
    {
        path: "/attendance",
        component: Layout,
        redirect: "/attendance/absence",
        name: "考勤申请",
        meta: {
            icon: "attendance",
        },
        children: [
            {
                path: "/attendance/absence",
                name: "缺勤申请",
                meta: {
                    icon: "absence",
                },
                component: () => import("@/pages/attendance/absence/Index.vue"),
            },
            {
                path: "/attendance/businesstrip",
                name: "出差申请",
                meta: {
                    icon: "businesstrip",
                },
                component: () => import("@/pages/attendance/businesstrip/Index.vue"),
            },
            {
                path: "/attendance/compensatory",
                name: "调休申请",
                meta: {
                    icon: "compensatory",
                },
                component: () => import("@/pages/attendance/compensatory/Index.vue"),
            },
            {
                path: "/attendance/fieldwork",
                name: "外勤申请",
                meta: {
                    icon: "fieldwork",
                },
                component: () => import("@/pages/attendance/fieldwork/Index.vue"),
            },
            {
                path: "/attendance/vacation",
                name: "休假申请",
                meta: {
                    icon: "vacation",
                },
                component: () => import("@/pages/attendance/vacation/Index.vue"),
            },
        ],
    },
]

export default ROUTERS
