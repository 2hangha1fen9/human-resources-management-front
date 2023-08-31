<template>
    <el-form ref="fieldworkdetailForm" label-width="142px" :model="fieldworkdetailData" :rules="fieldworkAddRules"
        v-loading="formLoading">
        <el-form-item prop="beginDate" label="出差日期 :" required>
            <el-date-picker v-model="fieldworkdetailData.beginDate" value-format="YYYY-MM-DD HH:mm:ss"
                format="YYYY-MM-DD HH:mm:ss" type="date" placeholder="开始日期" :size="size" />
        </el-form-item>
        <el-form-item style="margin-left: 220px;margin-top: -50px;" prop="endDate" required>
            <el-date-picker v-model="fieldworkdetailData.endDate" value-format="YYYY-MM-DD HH:mm:ss"
                format="YYYY-MM-DD HH:mm:ss" type="date" placeholder="结束日期" :size="size" />
        </el-form-item>
        <el-form-item prop="address" label="外勤目的地 :">
            <el-input v-model="fieldworkdetailData.address" />
        </el-form-item>
        <el-form-item prop="reason" label="外勤事由 :">
            <el-input type="textarea" maxlength="52" :autosize="{ minRows: 1, maxRows: 2 }" resize='none'
                v-model="fieldworkdetailData.reason" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save(fieldworkdetailForm)" :loading="buttonLoading">提交</el-button>
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
const fieldworkdetailForm = ref()
const fieldworkdetailData = ref({})
const fieldworkAddRules = {
    beginDate: [
        { required: true, message: "请选择开始日期", trigger: 'blur' }
    ],
    endDate: [
        { required: true, message: "请选择结束日期", trigger: 'blur' }
    ],
    address: [
        { required: true, message: "请填写外勤目的地", trigger: 'blur' }
    ],
    reason: [
        { required: true, message: "请填写外勤事由", trigger: 'blur' }
    ],
}

fieldworkdetailData.value = {
    fieldworkDateTime: "",
    checkintype: null,
    prover: "",
    reason: "",

}
const save = async form => {
    try {
        buttonLoading.value = true;
        await form.validate()
        await post('/fieldWorkapply/Apply', fieldworkdetailData.value)
        ElMessage.success("申请成功待主管审核")
        emit("onClose")
    } finally {
        buttonLoading.value = false;
    }
}
</script>

<style></style>