<template>
    <el-form ref="userForm" label-width="100px" :model="userData" :rules="userRules" v-loading="formLoading">
        <el-form-item prop="loginName" label="登录名 :" required>
            <el-input placeholder="请输入登录名" v-model="userData.loginName" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="password" label="密码 :" :required="props.userId === 0">
            <el-input placeholder="设置新密码" v-model="userData.password" type="password" />
        </el-form-item>
        <el-form-item prop="question" label="密保问题 :" required>
            <el-input placeholder="请输入密保问题" v-model="userData.question" />
        </el-form-item>
        <el-form-item prop="answer" label="密保答案 :" required>
            <el-input placeholder="设置新密保答案" v-model="userData.answer" />
        </el-form-item>
        <el-form-item prop="employeeId" label="关联员工 :">
            <el-select v-model="userData.employeeId" placeholder="输入工号或者姓名" remote filterable reserve-keyword clearable
                :loading="employeeLoading" :remote-method="searchEmployee">
                <el-option v-for="item in employeeList" :key="item.id" :label="`${item.name}(${item.workNum})`"
                    :value="item.id" />
            </el-select>
        </el-form-item>
        <el-form-item prop="status" label="状态 :">
            <el-switch v-model="userData.status" inline-prompt active-text="启用" :active-value="1" inactive-text="禁用"
                :inactive-value="2" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save(userForm)" :loading="buttonLoading">提交</el-button>
            <el-button @click="emit('onClose')">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { get, post, put } from "@/utils/request"
import { ElMessage } from 'element-plus';
const props = defineProps({
    userId: Number,
    default: 0
})
const emit = defineEmits(['onClose'])

const employeeList = ref([])
const formLoading = ref(false)
const buttonLoading = ref(false)
const employeeLoading = ref(false)
const userForm = ref()
const userData = ref({})
const userRules = {
    loginName: [
        { required: true, message: "请输入登录名", trigger: 'blur' }
    ],
    password: [
        { required: props.userId === 0, message: "请输入密码", trigger: 'blur' }
    ],
    question: [
        { required: true, message: "请输入密保问题", trigger: 'blur' }
    ],
    answer: [
        { required: true, message: "请输入密保答案", trigger: 'blur' }
    ]
}

const save = async form => {
    try {
        buttonLoading.value = true;
        await form.validate()
        if (props.userId > 0) {
            await put('/user/editUser', userData.value)
        }
        else {
            await post('/user/addUser', userData.value)
        }
        ElMessage.success("用户保存成功")
        emit("onClose")
    } finally {
        buttonLoading.value = false;
    }
}
const searchEmployee = async searchKey => {
    try {
        if (!searchKey) {
            employeeList.value = []
            return
        }

        employeeLoading.value = true;
        let res = await post('/employee/QueryEmployeeByPage', {
            rows: 0,
            searchKey
        })
        employeeList.value = res.data
    } finally {
        employeeLoading.value = false;
    }
}

if (props.userId > 0) {
    formLoading.value = true;
    get(`/user/GetUserById/${props.userId}`).then(async res => {
        userData.value = res.data
        //回写员工数据
        if (userData.value.employeeId > 0) {
            let res = await post('/employee/QueryEmployeeByPage', {
                rows: 0,
                employeeId: userData.value.employeeId
            })
            employeeList.value = res.data
        }
    }).finally(() => {
        formLoading.value = false;
    })
}
else {
    userData.value = {
        id: props.userId,
        loginName: "",
        password: "",
        question: "",
        answer: "",
        employeeId: null,
        status: 1,
    }
}
</script>

<style></style>