<template>
    <el-form ref="compensatorydetailForm" label-width="140px" :model="compensatorydetailData" v-loading="formLoading">
        <el-form-item prop="workDate" label="上班日期 :">
            <el-input disabled v-model="compensatorydetailData.workDate" />        
        </el-form-item>
        <el-form-item prop="restDate" label="倒休日期 :">
            <el-input disabled v-model="compensatorydetailData.restDate" />
        </el-form-item>
        <el-form-item prop="workPlan" label="工作安排 :">
            <el-input disabled v-model="compensatorydetailData.workPlan" />
        </el-form-item>
        <el-form-item prop="auditStatusStr" label="审核状态 :">
            <el-input disabled v-model="compensatorydetailData.auditStatusStr" />
        </el-form-item>
        <el-form-item prop="createTime" label="上报时间 :">
            <el-input disabled v-model="compensatorydetailData.createTime" />
        </el-form-item>
        <el-form-item prop="updateTime" label="更新时间 :">
            <el-input disabled v-model="compensatorydetailData.updateTime" />
        </el-form-item>
        <el-form-item prop="auditResult" label="审核意见 :" v-show="isshowAuditResult">
            <el-input  type="textarea" disabled :autosize="{ minRows: 1, maxRows: 2}"  resize='none' v-model="compensatorydetailData.auditResult" />
        </el-form-item>
    </el-form>
    <el-button style="margin-left: 500px;margin-bottom;:-26px" type="primary" @click="emit('onClose')">返回</el-button>
</template>

<script setup>
import { ref } from 'vue'
import { get, post, put } from "@/utils/request"
import { ElMessage } from 'element-plus';
import moment from 'moment'
const props = defineProps({
    id: Number,
    default: 0
})
const emit = defineEmits(['onClose'])

const formLoading = ref(false)
const compensatorydetailForm = ref()
const compensatorydetailData = ref({})
const isshowAuditResult = ref(false)

if (props.id > 0) {
    formLoading.value = true;
    post(`/compensatoryapply/GetCompensatoryById/${props.id}`).then(res => {
        compensatorydetailData.value = res.data
        compensatorydetailData.value.workDate=moment(compensatorydetailData.value.workDate).format("YYYY-MM-DD")
        compensatorydetailData.value.restDate=moment(compensatorydetailData.value.restDate).format("YYYY-MM-DD")
        if(compensatorydetailData.value.auditResult!=null){isshowAuditResult.value=true}

    }).finally(() => {
        formLoading.value = false;
    })
}
</script>

<style></style>