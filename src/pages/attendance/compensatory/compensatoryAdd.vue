<template>
    <el-form ref="compensatorydetailForm" label-width="142px" :model="compensatorydetailData" :rules="compensatoryAddRules"
        v-loading="formLoading">
        <el-form-item prop="workDate" label="上班日期 :">
            <el-date-picker type="date" style="width: 600px;" placeholder="选择时间" value-format="YYYY-MM-DD" format="YYYY-MM-DD" size="default" v-model="compensatorydetailData.workDate"/> 
        </el-form-item>
        <el-form-item prop="restDate" label="倒休日期 :">
            <el-date-picker type="date" style="width: 600px;" placeholder="选择时间" value-format="YYYY-MM-DD" format="YYYY-MM-DD" size="default" v-model="compensatorydetailData.restDate"/> 
        </el-form-item>
        <el-form-item prop="workPlan" label="工作安排 :">
            <el-input type="textarea" maxlength="52" :autosize="{ minRows: 1, maxRows: 2 }" resize='none'
                v-model="compensatorydetailData.workPlan" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save(compensatorydetailForm)" :loading="buttonLoading">提交</el-button>
            <el-button @click="emit('onClose')">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { get, post, put } from "@/utils/request"
import { ElMessage } from 'element-plus';
const emit = defineEmits(['onClose'])

const formLoading = ref(false)
const buttonLoading = ref(false)
const compensatorydetailForm = ref()
const compensatorydetailData = ref({})
const compensatoryAddRules = {
    workDate: [
        { required: true, message: "请选择上班日期", trigger: 'blur' }
    ],
    restDate: [
        { required: true, message: "请选择倒休日期", trigger: 'blur' }
    ],
    workPlan: [
        { required: true, message: "请填写工作安排", trigger: 'blur' }
    ]
}

compensatorydetailData.value = {
    compensatoryDateTime: "",
    checkintype: null,
    prover: "",
    reason: "",

}
const save = async form => {
    try {
        buttonLoading.value = true;
        await form.validate()
        await post('/compensatoryapply/Apply', compensatorydetailData.value)
        ElMessage.success("申请成功待主管审核")
        emit("onClose")
    } finally {
        buttonLoading.value = false;
    }
}
</script>

<style></style>