<template>
    <el-form ref="departmentForm" label-width="100px" :model="departmentData" :rules="departmentRules"
        v-loading="formLoading">
        <el-form-item prop="departmentName" label="部门名 :" required>
            <el-input placeholder="请输入部门名" v-model="departmentData.departmentName" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="status" label="状态 :">
            <el-switch v-model="departmentData.status" inline-prompt active-text="启用" :active-value="1" inactive-text="禁用"
                :inactive-value="2" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save(departmentForm)" :loading="buttonLoading">提交</el-button>
            <el-button @click="emit('onClose')">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { get, post, put } from "@/utils/request"
import { ElMessage } from 'element-plus';
const props = defineProps({
    departmentId: Number,
    default: 0
})
const emit = defineEmits(['onClose'])

const formLoading = ref(false)
const buttonLoading = ref(false)
const departmentForm = ref()
const departmentData = ref({})
const departmentRules = {
    departmentName: [
        { required: true, message: "请输入部门名", trigger: 'blur' }
    ]
}

const save = async form => {
    try {
        buttonLoading.value = true;
        await form.validate()
        if (props.departmentId > 0) {
            await put('/department/editDepartment', departmentData.value)
        }
        else {
            await post('/department/addDepartment', departmentData.value)
        }
        ElMessage.success("部门保存成功")
        emit("onClose")
    } finally {
        buttonLoading.value = false;
    }
}


if (props.departmentId > 0) {
    formLoading.value = true;
    get(`/department/GetDepartmentById/${props.departmentId}`).then(res => {
        departmentData.value = res.data
    }).finally(() => {
        formLoading.value = false;
    })
}
else {
    departmentData.value = {
        id: props.departmentId,
        departmentName: "",
        status: 1,
    }
}
</script>

<style></style>