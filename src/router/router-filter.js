import { get } from "@/utils/request";
import router from "@/router/index";
import ROUTERS from "@/router/router-info";
import store from "@/store/index";

//判断是否有权限
function hasPermission(permissions, route) {
    const resource = route.meta && route.meta.resource;
    if (resource) {
        return permissions.some((permission) => permission.resource === resource) || permissions.some((permission) => permission.resource === "*");
    }
    return true;
}
//过滤可用路由
function filterRoutes(routes, permissions) {
    const filteredRoutes = routes
        .filter((route) => {
            if (hasPermission(permissions, route)) {
                if (route.children && route.children.length) {
                    route.children = filterRoutes(route.children, permissions);
                }
                return true;
            }
            return false;
        })
        .map((route) => {
            if (!hasPermission(permissions, route)) {
                route.meta = route.meta || {};
                route.meta.hidden = true;
            }
            return route;
        });

    return filteredRoutes;
}

export default async function initRoute() {
    const user = store.getters["identity/user"];
    //获取权限信息添加路由
    let permissions = await get(`/permission/GetPermissionsByUserId/${user.id}`, { type: 2 });
    //过滤可用路由,动态添加过滤后的路由
    const filteredRoutes = filterRoutes(ROUTERS, permissions);
    filteredRoutes.forEach((route) => {
        router.addRoute(route);
    });
}
