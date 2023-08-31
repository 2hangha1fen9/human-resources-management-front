<template>
    <el-form ref="vacationdetailForm" label-width="120px" :model="vacationdetailData" v-loading="formLoading">
        <el-form-item prop="vacationDateTimeandcheckInTypeStr" label="休假日期 :">
            <el-button style="width: 500px;display: -webkit-box;background-color: var(--el-disabled-bg-color);" disabled>
                {{ vacationdetailData.beginDate+"到"+vacationdetailData.endDate }}</el-button>
        </el-form-item>
        <el-form-item prop="duration" label="合计天数 :">
            <el-input disabled v-model="vacationdetailData.duration" />
        </el-form-item>
        <el-form-item prop="vacationTypeStr" label="休假类型 :">
            <el-input disabled v-model="vacationdetailData.vacationTypeStr" />
        </el-form-item>
        <el-form-item prop="auditStatusStr" label="审核状态 :">
            <el-input disabled v-model="vacationdetailData.auditStatusStr" />
        </el-form-item>
        <el-form-item prop="createTime" label="上报时间 :">
            <el-input disabled v-model="vacationdetailData.createTime" />
        </el-form-item>
        <el-form-item prop="updateTime" label="更新时间 :">
            <el-input disabled v-model="vacationdetailData.updateTime" />
        </el-form-item>
        <el-form-item prop="reason" label="休假事由 :">
            <el-input type="textarea" disabled  :autosize="{ minRows: 1, maxRows: 2}" resize='none' v-model="vacationdetailData.reason" />
        </el-form-item>
        <el-form-item prop="auditResult" label="审核意见 :" v-show="isshowAuditResult">
            <el-input  type="textarea" disabled :autosize="{ minRows: 1, maxRows: 2}"  resize='none' v-model="vacationdetailData.auditResult" />
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
const vacationdetailForm = ref()
const vacationdetailData = ref({})
const isshowAuditResult = ref(false)

if (props.id > 0) {
    formLoading.value = true;
    post(`/vacationapply/GetVacationById/${props.id}`).then(res => {
        vacationdetailData.value = res.data
        if(vacationdetailData.value.auditResult!=null){isshowAuditResult.value=true}
    }).finally(() => {
        formLoading.value = false;
    })
}
</script>

<style></style>