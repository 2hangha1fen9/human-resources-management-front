import router from "@/router/index"
import ROUTERS from "@/router/router-info"

//过滤可用路由
function filterRoutes(routes, permissions) {
    const allowedResources = permissions.map((permission) => permission.resource)

    // 如果权限列表中包含 "*", 直接返回原始路由列表
    if (allowedResources.includes("*")) {
        return ROUTERS
    }

    function filterRoutesRecursive(routes) {
        return routes
            .filter((route) => {
                // 如果该路由已经在允许的资源列表中，保留它
                if (allowedResources.includes(route.path)) {
                    return true
                }

                // 如果该路由有子路由，检查子路由中是否有权限
                if (route.children) {
                    return route.children.some((childRoute) => allowedResources.includes(childRoute.path))
                }

                // 如果没有子路由且路由不在允许的资源列表中，过滤掉它
                return false
            })
            .map((route) => {
                if (route.children) {
                    route.children = filterRoutesRecursive(route.children)
                }
                return route
            })
    }

    return filterRoutesRecursive(routes)
}

export default async function createRoute(permissions) {
    //清空路由信息
    router.getRoutes().forEach((route) => router.removeRoute(route.name))
    //过滤可用路由,动态添加过滤后的路由
    const filteredRoutes = filterRoutes([...ROUTERS], permissions)
    router.options.routes = filteredRoutes
    filteredRoutes.forEach((route) => {
        router.addRoute(route)
    })
}
