<template>
    <el-form ref="businesstripdetailForm" label-width="142px" :model="businesstripdetailData" :rules="businesstripAddRules"
        v-loading="formLoading">
        <el-form-item prop="beginDate" label="出差日期 :" required>
            <el-date-picker v-model="businesstripdetailData.beginDate" value-format="YYYY-MM-DD HH:mm:ss"
                format="YYYY-MM-DD HH:mm:ss" type="date" placeholder="开始日期" :size="size" />
        </el-form-item>
        <el-form-item style="margin-left: 220px;margin-top: -50px;" prop="endDate" required>
            <el-date-picker v-model="businesstripdetailData.endDate" value-format="YYYY-MM-DD HH:mm:ss"
                format="YYYY-MM-DD HH:mm:ss" type="date" placeholder="结束日期" :size="size" />
        </el-form-item>
        <el-form-item prop="address" label="出差目的地 :">
            <el-input v-model="businesstripdetailData.address" />
        </el-form-item>
        <el-form-item prop="reason" label="出差事由 :">
            <el-input type="textarea" maxlength="52" :autosize="{ minRows: 1, maxRows: 2 }" resize='none'
                v-model="businesstripdetailData.reason" />
        </el-form-item>
        <el-form-item prop="result" label="出差归来结果 :">
            <el-input type="textarea" maxlength="52" :autosize="{ minRows: 1, maxRows: 2 }" resize='none'
                v-model="businesstripdetailData.result" />
        </el-form-item>
        <el-form-item prop="support" label="所需支持 :">
            <el-input type="textarea" maxlength="52" :autosize="{ minRows: 1, maxRows: 2 }" resize='none'
                v-model="businesstripdetailData.support" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save(businesstripdetailForm)" :loading="buttonLoading">提交</el-button>
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
const businesstripdetailForm = ref()
const businesstripdetailData = ref({})
const businesstripAddRules = {
    beginDate: [
        { required: true, message: "请选择开始日期", trigger: 'blur' }
    ],
    endDate: [
        { required: true, message: "请选择结束日期", trigger: 'blur' }
    ],
    address: [
        { required: true, message: "请填写出差目的地", trigger: 'blur' }
    ],
    reason: [
        { required: true, message: "请填写出差事由", trigger: 'blur' }
    ],
    result: [
        { required: true, message: "请填写预计出差归来结果", trigger: 'blur' }
    ],
    support: [
        { required: true, message: "请填写所需支持", trigger: 'blur' }
    ]
}

businesstripdetailData.value = {
    businesstripDateTime: "",
    checkintype: null,
    prover: "",
    reason: "",

}
const save = async form => {
    try {
        buttonLoading.value = true;
        await form.validate()
        await post('/businesstripapply/Apply', businesstripdetailData.value)
        ElMessage.success("申请成功待主管审核")
        emit("onClose")
    } finally {
        buttonLoading.value = false;
    }
}
</script>

<style></style>