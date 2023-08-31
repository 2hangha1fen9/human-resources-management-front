<template>
    <a-card>
        <el-form style="width: 400px;" label-width="100px" ref="form" :model="questionData" :rules="questionRules"
            @keyup.enter="save(form)">
            <el-form-item label="密码 :" prop="password" required>
                <el-input tabindex="1" autocomplete="on" placeholder="请输入密码" v-model="questionData.password"
                    type="password">
                </el-input>
            </el-form-item>
            <el-form-item label="安全问题 :" prop="question" required>
                <el-input tabindex="1" autocomplete="on" placeholder="请输入安全问题" v-model="questionData.question"
                    type="question">
                </el-input>
            </el-form-item>
            <el-form-item label="答案 :" prop="answer" required>
                <el-input tabindex="1" autocomplete="on" placeholder="请输答案" v-model="questionData.answer" type="question">
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
const questionData = reactive({
    password: "",
    question: "",
    answer: ""
})
const questionRules = {
    password: [
        { required: true, message: "请输入密码", trigger: 'blur' }
    ],
    question: [
        { required: true, message: "请输入安全问题", trigger: 'blur' }
    ],
    answer: [
        { required: true, message: "请输答案", trigger: 'blur' }
    ]
}
const save = async form => {
    try {
        buttonLoading.value = true
        await form.validate()
        await put('/user/ChangeQuestion', questionData)
        ElMessage.success("安全问题修改成功")
    } finally {
        buttonLoading.value = false
    }
}
</script>

<style></style>