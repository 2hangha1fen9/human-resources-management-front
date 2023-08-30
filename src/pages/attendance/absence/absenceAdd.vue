<template>
    <el-form ref="absencedetailForm" label-width="120px" :model="absencedetailData" :rules="absenceAddRules" v-loading="formLoading">
        <el-form-item prop="absenceDateTime" label="缺打考勤时间 :" required>
            <el-date-picker style="width: 600px;" v-model="absencedetailData.absenceDateTime" value-format="YYYY-MM-DD HH:mm:ss" format="YYYY-MM-DD HH:mm:ss" type="date" placeholder="选择时间" :size="size" required/>
        </el-form-item>
        <el-form-item prop="checkintype" label="打卡类型" required>
            <EnumSelect style="width: 600px;" size="default" api="/enum/Get/CheckInType" v-model="absencedetailData.checkintype" 
                allOptionLable="请选择" :allOptionValue="null"/>
        </el-form-item>
        <el-form-item prop="prover" label="证明人 :" required>
            <el-input v-model="absencedetailData.prover" />
        </el-form-item>
        <el-form-item prop="reason" label="缺打事由 :" required>
            <el-input type="textarea" maxlength="52" :autosize="{ minRows: 1, maxRows: 2 }" resize='none'
                v-model="absencedetailData.reason" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save(absencedetailForm)" :loading="buttonLoading">提交</el-button>
            <el-button @click="emit('onClose')">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref,reactive } from 'vue'
import EnumSelect from '@/components/EnumSelect.vue'
import { get, post, put } from "@/utils/request"
import { ElMessage } from 'element-plus';
const emit = defineEmits(['onClose'])

const formLoading = ref(false)
const buttonLoading = ref(false)
const absencedetailForm = ref()
const absencedetailData = ref({})
const absenceAddRules = {
    absenceDateTime: [
        { required: true, message: "请选择缺勤日期", trigger: 'blur' }
    ],
    checkintype: [
        { required: true, message: "请选择打卡类型", trigger: 'blur' }
    ],
    prover: [
        { required: true, message: "请填写证明人", trigger: 'blur' }
    ],
    reason: [
        { required: true, message: "请填写缺打事由", trigger: 'blur' }
    ] 
}

absencedetailData.value={
    absenceDateTime:"",
    checkintype: null,
    prover:"",
    reason:"",

}
const save = async form => {
    try {
        if(absenceAddRules.checkintype==-1)
        ElMessage.error("请选择打卡类型")
        buttonLoading.value = true;
        await form.validate()
        await post('/absenceapply/Apply', absencedetailData.value)
        ElMessage.success("申请成功待主管审核")
        emit("onClose")
    } finally {
        buttonLoading.value = false;
    }
}
</script>

<style></style>