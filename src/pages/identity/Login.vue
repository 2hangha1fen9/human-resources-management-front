<template>
    <section class="login-container">
        <router-link to="/identity/forget" :replace="true" class="forget-btn">忘记密码</router-link>
        <el-form size="large" ref="loginForm" class="login-form" :model="loginData" :rules="loginDataRules"
            @keyup.enter="login(loginForm)">
            <el-form-item>
                <h3 style="width: 100%;display: flex;justify-content: flex-start;align-items: center;">
                    <img src="/favicon.ico" alt="" style="object-fit: cover;width: 50px;margin-right: 15px;">
                    <span>商院人力资源管理系统</span>
                </h3>
            </el-form-item>
            <el-form-item prop="loginName" required>
                <el-input class="input-box" tabindex="1" autocomplete="on" placeholder="请输入登录名"
                    v-model="loginData.loginName">
                </el-input>
            </el-form-item>
            <el-form-item prop="password" required>
                <el-input tabindex="2" placeholder="请输入密码" v-model="loginData.password" type="password">
                </el-input>
            </el-form-item>
            <el-button type="primary" style="width: 100%; margin-bottom: 30px" :loading="buttonLoading"
                @click="login(loginForm)">登录</el-button>
        </el-form>
    </section>
</template>

<script setup>
import { useStore } from "vuex"
import { reactive, ref, watch } from "vue"
import { useRouter, useRoute } from "vue-router"
import { post } from '@/utils/request'

const router = useRouter()
const route = useRoute()
const store = useStore()

//重定向路径
const redirect = ref()
//按钮加载状态
const buttonLoading = ref(false)
//登录相关数据
const loginForm = ref()
const loginData = reactive({
    loginName: "",
    password: "",
})
const loginDataRules = {
    loginName: [
        { required: true, message: "请输入登录名", trigger: 'blur' }
    ],
    password: [
        { required: true, message: "请输入密码", trigger: 'blur' }
    ]
}
//登录方法
const login = async form => {
    try {
        buttonLoading.value = true;
        //验证表单
        await form.validate();
        //执行登录
        const result = await post("/user/login", loginData)
        //保存用户token
        await store.dispatch('identity/login', result.data)
        //初始化路由
        await store.dispatch('identity/initRoute')
        //跳转主页
        router.push({ path: redirect.value || "/" })
    } finally {
        buttonLoading.value = false
    }
}
//监控路由重定向
watch(
    route,
    (routes) => {
        redirect.value = routes.query && routes.query.redirect
    },
    {
        immediate: true,
    }
)
</script>

<style scoped>
.login-container {
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.login-form {
    width: 350px;
    padding: 30px 20px 10px 20px;
    border-radius: 10px;
    color: #fff;
    background-color: rgba(255, 255, 255, 0.25);
    box-shadow: rgb(0 0 0 / 20%) 0 0 10px;
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    overflow: hidden;
}

.forget-btn {
    z-index: 9;
    position: absolute;
    right: 0;
    top: 0;
    font-size: 0.3em;
    color: var(--el-color-white);
    background-color: var(--el-mask-color-extra-light);
    padding: 5px 15px 5px 15px;
    backdrop-filter: blur(20px);
    text-decoration: none;
}

.forget-btn {
    border-bottom-left-radius: 10px;
    border-top-right-radius: 10px;
}

.forget-btn:hover {
    background-color: var(--el-mask-color);
}
</style>
