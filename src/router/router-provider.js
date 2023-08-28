import router from "@/router/index"
import ROUTERS from "@/router/router-info"
import { baseRoutes } from "@/router/index"

//判断是否有权限
function hasPermission(permissions, route) {
    const resource = route.meta && route.meta.resource
    if (resource) {
        return permissions.some((permission) => permission.resource === resource) || permissions.some((permission) => permission.resource === "*")
    }
    return true
}
//过滤可用路由
function filterRoutes(routes, permissions) {
    const allowedResources = permissions.map((permission) => permission.resource)

    // 如果权限列表中包含 "*", 直接返回原始路由列表
    if (allowedResources.includes("*")) {
        return routes
    }

    function filterRoutes(routes) {
        return routes
            .filter((route) => allowedResources.includes(route.path))
            .map((route) => {
                if (route.children) {
                    route.children = filterRoutes(route.children)
                }
                return route
            })
    }

    return filterRoutes(routes)
}

export default async function createRoute(permissions) {
    //清空路由信息
    router.getRoutes().forEach((route) => router.removeRoute(route.name))
    //过滤可用路由,动态添加过滤后的路由
    const filteredRoutes = filterRoutes(ROUTERS, permissions)
    router.options.routes = filteredRoutes
    filteredRoutes.forEach((route) => {
        router.addRoute(route)
    })
}
