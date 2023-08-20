<template>
    <section class="login-container">
        <img id="bgBox" src="https://baotangguo.cn:8081/" />
        <el-form size="large" ref="loginForm" status-icon class="login-form">
            <el-form-item>
                <h3 style="width: 100%">
                    <svg-icon icon-class="sunny" />
                    商院人力资源管理系统
                </h3>
            </el-form-item>
            <el-form-item prop="username" required>
                <el-input class="input-box" tabindex="1" min="6" max="20" autocomplete="on">
                </el-input>
            </el-form-item>
            <el-form-item prop="password" required>
                <el-input tabindex="1" min="6" :max="20">
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
.login-container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

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
    transition: color 0.25s, background-color 0.25s, box-shadow 0.25s, left 0.25s, opacity 0.25s, top 0.25s, width 0.25s;
}
</style>
