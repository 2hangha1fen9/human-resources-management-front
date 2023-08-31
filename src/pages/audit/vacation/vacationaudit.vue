<template>
    <el-form ref="vacationAuditForm" label-width="120px" :model="vacationAuditlData" :rules="vacationAddRules" v-loading="formLoading">
        <el-form-item prop="auditStatus" label="审核状态 :">
            <el-switch v-model="vacationAuditlData.auditStatus" inline-prompt active-text="同意" :active-value="2" inactive-text="拒绝"
                :inactive-value="3" />
        </el-form-item>
        <el-form-item prop="auditResult" label="审核意见 :" required>
            <el-input type="textarea" maxlength="52" :autosize="{ minRows: 1, maxRows: 2 }" resize='none'
                v-model="vacationAuditlData.auditResult" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save(vacationAuditForm)" :loading="buttonLoading">提交</el-button>
            <el-button @click="emit('onClose')">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { get, post, put } from "@/utils/request"
import { ElMessage } from 'element-plus';
const props = defineProps({
    id: Number,
    default: 0
})
const vacationAddRules = {
    auditResult: [
        { required: true, message: "请填写审核意见", trigger: 'blur' }
    ]
}

const emit = defineEmits(['onClose'])

const formLoading = ref(false)
const buttonLoading = ref(false)
const vacationAuditForm = ref()
const vacationAuditlData = ref({})

vacationAuditlData.value={
    id:props.id,
    auditStatus:2,
}

const save = async form => {
    try {
        buttonLoading.value = true;
        await form.validate()
        await put('/vacationapply/ExamineVacationApply', vacationAuditlData.value)
        ElMessage.success("已审核")
        emit("onClose")
    } finally {
        buttonLoading.value = false;
    }
}
</script>

<style></style>