<template>
    <section class="login-container">
        <img id="bgBox"
            src="https://ssorz.cqbvc.edu.cn/imageserver/100004/ump/images/2020/04/29/1588122546756X9SjjyT.jpg" />
        <el-form size="large" ref="loginForm" class="login-form">
            <el-form-item>
                <h3 style="width: 100%;display: flex;justify-content: flex-start;align-items: center;">
                    <img src="/favicon.ico" alt="" style="object-fit: cover;width: 50px;margin-right: 15px;">
                    <span>商院人力资源管理系统</span>
                </h3>
            </el-form-item>
            <el-form-item prop="username" required>
                <el-input class="input-box" tabindex="1" min="6" max="20" autocomplete="on" placeholder="请输入登录名">
                </el-input>
            </el-form-item>
            <el-form-item prop="password" required>
                <el-input tabindex="1" min="6" :max="20" placeholder="请输入密码">
                </el-input>
            </el-form-item>
            <el-button type="primary" style="width: 100%; margin-bottom: 30px">登录</el-button>
        </el-form>
    </section>
</template>

<script setup lang="ts">
import { useStore } from "vuex"
import { reactive, ref, watch } from "vue"
import { useRouter, useRoute } from "vue-router"
import { FormRules, FormInstance, ElMessage } from "element-plus"

const router = useRouter()
const route = useRoute()
const store = useStore()
</script>

<style scoped>
#bgBox {
    z-index: -1;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: opacity 1s, transform 0.25s, filter 0.25s;
}

.login-container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
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
</style>
