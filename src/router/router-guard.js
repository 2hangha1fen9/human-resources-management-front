import router from "./index"
import { ElMessage } from "element-plus"
import store from "@/store/index"

//路由白名单
const whiteList = ["/login"]

//初始化路由
await store.dispatch("identity/initRoute")

router.beforeEach(async (to, from, next) => {
    if (store.getters["identity/isValid"]) {
        //如果已经登录了则跳转
        next()
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            //清除所有信息跳转到登录页
            await store.dispatch("identity/logout")
            ElMessage({
                message: "凭证过期,请重新登录",
                grouping: true,
                type: "warning",
            })
            next(`/login`)
        }
    }
})

router.afterEach(() => {})
