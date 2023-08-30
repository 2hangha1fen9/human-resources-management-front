<template>
    <section class="forget-container">
        <router-link to="/identity" :replace="true" class="login-btn">登录</router-link>
        <el-form size="large" ref="loginForm" class="forget-form" :model="loginData" :rules="loginDataRules"
            @keyup.enter="next" label-position="top">
            <el-steps :active="active" finish-status="success" style="margin-bottom: 20px;">
                <el-step title="账号验证" />
                <el-step title="密保验证" />
                <el-step title="设置密码" />
            </el-steps>
            <el-form-item prop="loginName" v-show="active == 0">
                <el-input class="input-box" tabindex="1" autocomplete="on" placeholder="请输入登录名"
                    v-model="forgetData.loginName">
                </el-input>
            </el-form-item>
            <el-form-item prop="loginName" v-show="active == 1" :label="forgetData.question">
                <el-input class="input-box" tabindex="1" autocomplete="on" placeholder="请输入密保答案"
                    v-model="forgetData.answer">
                </el-input>
            </el-form-item>
            <el-form-item prop="loginName" v-show="active == 2">
                <el-input class="input-box" tabindex="1" autocomplete="on" placeholder="请输入新密码" type="password"
                    v-model="forgetData.password">
                </el-input>
            </el-form-item>
            <el-form-item prop="loginName" v-show="active == 2">
                <el-input class="input-box" tabindex="1" autocomplete="on" placeholder="确认新密码" type="password"
                    v-model="forgetData.newPassword">
                </el-input>
            </el-form-item>
            <el-button type="primary" style="width: 100%; margin-bottom: 30px" :loading="buttonLoading" @click="next">{{
                activeText[active] }}</el-button>
        </el-form>
    </section>
</template>

<script setup>
import { ref, reactive } from "vue"
import { useRouter } from "vue-router"
import { post, put, get } from '@/utils/request'
import { ElMessage } from "element-plus";

const buttonLoading = ref(false)
const router = useRouter()
const active = ref(0)
const activeText = {
    0: "下一步",
    1: "下一步",
    2: "提交",
}
const forgetData = reactive({
    loginName: "",
    question: "",
    answer: "",
    password: "",
    newPassword: ""
})


const getUserInfo = async () => {
    try {
        buttonLoading.value = true
        let res = await get('/user/GetUserByLoginName', { loginName: forgetData.loginName })
        console.log(res)
        forgetData.question = res.data.question
        forgetData.answer = res.data.answer
        active.value = 1
    }
    finally {
        buttonLoading.value = false
    }
}
const checkAnswer = async () => {
    try {
        buttonLoading.value = true
        await post('/user/CheckAnswer', forgetData)
        active.value = 2
    }
    finally {
        buttonLoading.value = false
    }
}
const save = async () => {
    try {
        buttonLoading.value = true
        await put('/user/ForgotPassword', forgetData)
        active.value = 3
        ElMessage.success("密码重置成功")
        router.push('/identity/login')
    }
    finally {
        buttonLoading.value = false
    }
}

const next = async () => {
    //获取账户信息
    if (active.value === 0) {
        await getUserInfo()
    }
    //验证密保问题
    else if (active.value === 1) {
        await checkAnswer()
    }
    //设置密码
    else if (active.value === 2) {
        if (forgetData.password != forgetData.newPassword) {
            ElMessage.error("两次输入密码不一致")
            return
        }
        if (!forgetData.password || !forgetData.newPassword) {
            return
        }
        await save()
    }
}

</script>

<style scoped>
.forget-container {
    max-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}

.forget-form {
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

.login-btn {
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

.login-btn {
    border-bottom-left-radius: 10px;
    border-top-right-radius: 10px;
}

.login-btn:hover {
    background-color: var(--el-mask-color);
}

.forget-container>>>.el-step__title {
    color: white;
}

.forget-container>>>.el-form-item__label {
    color: white;
}
</style>
