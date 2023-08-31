<template>
    <el-form ref="fieldworkdetailForm" label-width="140px" :model="fieldworkdetailData" v-loading="formLoading">
        <el-form-item prop="fieldworkDateTimeandcheckInTypeStr" label="外勤日期 :">
            <el-button style="width: 500px;display: -webkit-box;background-color: var(--el-disabled-bg-color);" disabled>{{ fieldworkdetailData.beginDate+"至"+fieldworkdetailData.endDate }}</el-button>
        </el-form-item>
        <el-form-item prop="duration" label="合计天数 :">
            <el-input disabled v-model="fieldworkdetailData.duration" />
        </el-form-item>
        <el-form-item prop="address" label="外勤目的地 :">
            <el-input disabled v-model="fieldworkdetailData.address" />
        </el-form-item>
        <el-form-item prop="auditStatusStr" label="审核状态 :">
            <el-input disabled v-model="fieldworkdetailData.auditStatusStr" />
        </el-form-item>
        <el-form-item prop="createTime" label="上报时间 :">
            <el-input disabled v-model="fieldworkdetailData.createTime" />
        </el-form-item>
        <el-form-item prop="updateTime" label="更新时间 :">
            <el-input disabled v-model="fieldworkdetailData.updateTime" />
        </el-form-item>
        <el-form-item prop="reason" label="外勤事由 :">
            <el-input type="textarea" disabled  :autosize="{ minRows: 1, maxRows: 2}" resize='none' v-model="fieldworkdetailData.reason" />
        </el-form-item>
        <el-form-item prop="auditResult" label="审核意见 :" v-show="isshowAuditResult">
            <el-input  type="textarea" disabled :autosize="{ minRows: 1, maxRows: 2}"  resize='none' v-model="fieldworkdetailData.auditResult" />
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
const fieldworkdetailForm = ref()
const fieldworkdetailData = ref({})
const isshowAuditResult = ref(false)

if (props.id > 0) {
    formLoading.value = true;
    post(`/fieldWorkapply/GetFieldWorkById/${props.id}`).then(res => {
        fieldworkdetailData.value = res.data
        if(fieldworkdetailData.value.auditResult!=null){isshowAuditResult.value=true}
    }).finally(() => {
        formLoading.value = false;
    })
}
</script>

<style></style>