import { createApp } from "vue"
import ElementPlus from "element-plus"
import Icon from "@/components/Icon.vue"
import zhCn from "element-plus/es/locale/lang/zh-cn"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import "@/router/router-guard"
import mitt from "mitt"
import "element-plus/theme-chalk/dark/css-vars.css"
import "element-plus/dist/index.css"
import "./styles/transition.scss"
import "./styles/table.css"
//全局事件总线注册
const Bus = mitt()
const app = createApp(App)
app.component("Icon", Icon)
app.use(store)
app.use(router)
app.use(ElementPlus, { locale: zhCn })
app.config.globalProperties.$bus = Bus
app.mount("#app")
