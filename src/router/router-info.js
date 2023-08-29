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
    {
        path: "/audit",
        component: Layout,
        redirect: "/audit/absence",
        name: "考勤审核",
        meta: {
            icon: "audit",
        },
        children: [
            {
                path: "/audit/absence",
                name: "缺勤审核",
                meta: {
                    icon: "absence",
                },
                component: () => import("@/pages/audit/absence/Index.vue"),
            },
            {
                path: "/audit/businesstrip",
                name: "出差审核",
                meta: {
                    icon: "businesstrip",
                },
                component: () => import("@/pages/audit/businesstrip/Index.vue"),
            },
            {
                path: "/audit/compensatory",
                name: "调休审核",
                meta: {
                    icon: "compensatory",
                },
                component: () => import("@/pages/audit/compensatory/Index.vue"),
            },
            {
                path: "/audit/fieldwork",
                name: "外勤审核",
                meta: {
                    icon: "fieldwork",
                },
                component: () => import("@/pages/audit/fieldwork/Index.vue"),
            },
            {
                path: "/audit/vacation",
                name: "休假审核",
                meta: {
                    icon: "vacation",
                },
                component: () => import("@/pages/audit/vacation/Index.vue"),
            },
        ],
    },
    {
        path: "/employee",
        component: Layout,
        redirect: "/employee/manage",
        name: "员工管理",
        meta: {
            icon: "employee",
        },
        children: [
            {
                path: "/employee/manage",
                name: "员工列表",
                meta: {
                    icon: "list",
                },
                component: () => import("@/pages/employee/manage/Index.vue"),
            },
            {
                path: "/employee/summary",
                name: "员工汇总",
                meta: {
                    icon: "summary",
                },
                component: () => import("@/pages/employee/summary/Index.vue"),
            },
        ],
    },
    {
        path: "/security",
        component: Layout,
        redirect: "/security/password",
        name: "安全设置",
        meta: {
            icon: "security",
        },
        children: [
            {
                path: "/security/password",
                name: "修改密码",
                meta: {
                    icon: "password",
                },
                component: () => import("@/pages/security/password/Index.vue"),
            },
            {
                path: "/security/question",
                name: "修改密保",
                meta: {
                    icon: "question",
                },
                component: () => import("@/pages/security/question/Index.vue"),
            },
        ],
    },
]

export default ROUTERS
