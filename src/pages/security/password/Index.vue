<template>
    <a-card>
        <el-form style="width: 400px;" label-width="100px" ref="form" :model="passwordData" :rules="passwordRules"
            @keyup.enter="save(form)">
            <el-form-item label="原密码 :" prop="password" required>
                <el-input tabindex="1" autocomplete="on" placeholder="请输入原密码" v-model="passwordData.password"
                    type="password">
                </el-input>
            </el-form-item>
            <el-form-item label="新密码 :" prop="newPassword" required>
                <el-input tabindex="1" autocomplete="on" placeholder="请输入原密码" v-model="passwordData.newPassword"
                    type="password">
                </el-input>
            </el-form-item>
            <el-form-item label="确认密码 :" prop="renewPassword" required>
                <el-input tabindex="1" autocomplete="on" placeholder="请输确认密码" v-model="passwordData.renewPassword"
                    type="password">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="save(form)" :loading="buttonLoading">提交</el-button>
            </el-form-item>
        </el-form>
    </a-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { put } from '@/utils/request'
import { ElMessage } from 'element-plus';
import { useStore } from "vuex"

const store = useStore()
const buttonLoading = ref(false)
const form = ref()
const passwordData = reactive({
    password: "",
    newPassword: "",
    renewPassword: ""
})
const passwordRules = {
    password: [
        { required: true, message: "请输入登录名", trigger: 'blur' }
    ],
    newPassword: [
        { required: true, message: "请输入新密码", trigger: 'blur' }
    ],
    renewPassword: [
        { required: true, message: "请输入确认新密码", trigger: 'blur' }
    ]
}
const save = async form => {
    try {
        buttonLoading.value = true
        await form.validate()
        await put('/user/ChangePwd', passwordData)
        ElMessage.success("密码修改成功")
        store.dispatch('identity/logout');
        window.location.href = '/login'
    } finally {
        buttonLoading.value = false
    }
}
</script>

<style></style>