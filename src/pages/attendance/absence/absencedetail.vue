<template>
    <el-form ref="absencedetailForm" label-width="120px" :model="absencedetailData" v-loading="formLoading">
        <el-form-item prop="absenceDateTimeandcheckInTypeStr" label="缺打考勤时间 :">
            <el-button style="width: 500px;display: -webkit-box;background-color: var(--el-disabled-bg-color);" disabled>{{absencedetailData.absenceDateTime+absencedetailData.checkInTypeStr}}</el-button>
        </el-form-item>
        <el-form-item prop="prover" label="证明人 :">
            <el-input disabled v-model="absencedetailData.prover" />
        </el-form-item>
        <el-form-item prop="auditStatusStr" label="审核状态 :">
            <el-input disabled v-model="absencedetailData.auditStatusStr" />
        </el-form-item>
        <el-form-item prop="createTime" label="上报时间 :">
            <el-input disabled v-model="absencedetailData.createTime" />
        </el-form-item>
        <el-form-item prop="updateTime" label="更新时间 :">
            <el-input disabled v-model="absencedetailData.updateTime" />
        </el-form-item>
        <el-form-item prop="reason" label="缺打事由 :">
            <el-input type="textarea" disabled  :autosize="{ minRows: 1, maxRows: 2}" resize='none' v-model="absencedetailData.reason" />
        </el-form-item>
        <el-form-item prop="auditResult" label="审核意见 :" v-show="isshowAuditResult">
            <el-input  type="textarea" disabled :autosize="{ minRows: 1, maxRows: 2}"  resize='none' v-model="absencedetailData.auditResult" />
        </el-form-item>
    </el-form>
    <el-button style="margin-left: 500px;margin-bottom;:-26px" type="primary" @click="emit('onClose')">返回</el-button>
</template>

<script setup>
import { ref } from 'vue'
import { get, post, put } from "@/utils/request"
import { ElMessage } from 'element-plus';
const props = defineProps({
    id: Number,
    default: 0
})
const emit = defineEmits(['onClose'])

const formLoading = ref(false)
const absencedetailForm = ref()
const absencedetailData = ref({})
const isshowAuditResult = ref(false)

if (props.id > 0) {
    formLoading.value = true;
    post(`/absenceapply/GetAbsenceById/${props.id}`).then(res => {
        absencedetailData.value = res.data
        if(absencedetailData.value.auditResult!=null){isshowAuditResult.value=true}
    }).finally(() => {
        formLoading.value = false;
    })
}
</script>

<style></style>