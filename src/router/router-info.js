import Layout from "@/pages/layout/index.vue";

//静态路由表
const ROUTERS = [
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
                path: "/system/role",
                meta: {
                    title: "角色管理",
                    icon: "role",
                },
                component: () => import("@/pages/system/role/Index.vue"),
            },
            {
                path: "/system/permission",
                meta: {
                    title: "权限管理",
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
        meta: {
            title: "考勤申请",
            icon: "attendance",
        },
        children: [
            {
                path: "/attendance/absence",
                meta: {
                    title: "缺勤申请",
                    icon: "absence",
                },
                component: () => import("@/pages/attendance/absence/Index.vue"),
            },
            {
                path: "/attendance/businesstrip",
                meta: {
                    title: "出差申请",
                    icon: "businesstrip",
                },
                component: () => import("@/pages/attendance/businesstrip/Index.vue"),
            },
            {
                path: "/attendance/compensatory",
                meta: {
                    title: "调休申请",
                    icon: "compensatory",
                },
                component: () => import("@/pages/attendance/compensatory/Index.vue"),
            },
            {
                path: "/attendance/fieldwork",
                meta: {
                    title: "外勤申请",
                    icon: "fieldwork",
                },
                component: () => import("@/pages/attendance/fieldwork/Index.vue"),
            },
            {
                path: "/attendance/vacation",
                meta: {
                    title: "休假申请",
                    icon: "vacation",
                },
                component: () => import("@/pages/attendance/vacation/Index.vue"),
            },
        ],
    },
];

export default ROUTERS;
