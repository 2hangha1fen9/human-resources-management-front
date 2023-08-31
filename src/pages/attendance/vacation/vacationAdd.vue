<template>
    <el-form ref="vacationdetailForm" label-width="142px" :model="vacationdetailData" :rules="vacationAddRules"
        v-loading="formLoading">
        <el-form-item prop="beginDate" label="休假日期 :" required>
            <el-date-picker v-model="vacationdetailData.beginDate" value-format="YYYY-MM-DD HH:mm:ss"
                format="YYYY-MM-DD HH:mm:ss" type="date" placeholder="开始日期" :size="size" />
        </el-form-item>
        <el-form-item style="margin-left: 220px;margin-top: -50px;" prop="endDate" required>
            <el-date-picker v-model="vacationdetailData.endDate" value-format="YYYY-MM-DD HH:mm:ss"
                format="YYYY-MM-DD HH:mm:ss" type="date" placeholder="结束日期" :size="size" />
        </el-form-item>
        <el-form-item prop="vacationtype" label="休假类型 :">
            <EnumSelect size="small" api="/enum/Get/VacationType" v-model="vacationdetailData.vacationtype"
            allOptionLable="请选择" :allOptionValue="null" />
        </el-form-item>
        <el-form-item prop="reason" label="休假事由 :">
            <el-input type="textarea" maxlength="52" :autosize="{ minRows: 1, maxRows: 2 }" resize='none'
                v-model="vacationdetailData.reason" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save(vacationdetailForm)" :loading="buttonLoading">提交</el-button>
            <el-button @click="emit('onClose')">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { get, post, put } from "@/utils/request"
import { ElMessage } from 'element-plus';
import EnumSelect from '@/components/EnumSelect.vue'
const emit = defineEmits(['onClose'])

const formLoading = ref(false)
const buttonLoading = ref(false)
const vacationdetailForm = ref()
const vacationdetailData = ref({})
const vacationAddRules = {
    beginDate: [
        { required: true, message: "请选择开始日期", trigger: 'blur' }
    ],
    endDate: [
        { required: true, message: "请选择结束日期", trigger: 'blur' }
    ],
    vacationtype: [
        { required: true, message: "请选择休假类型", trigger: 'blur' }
    ],
    reason: [
        { required: true, message: "请填写休假事由", trigger: 'blur' }
    ],
}

vacationdetailData.value = {
    vacationDateTime: "",
    vacationtype: null,
    prover: "",
    reason: "",

}
const save = async form => {
    try {
        buttonLoading.value = true;
        await form.validate()
        await post('/vacationapply/Apply', vacationdetailData.value)
        ElMessage.success("申请成功待主管审核")
        emit("onClose")
    } finally {
        buttonLoading.value = false;
    }
}
</script>

<style></style>