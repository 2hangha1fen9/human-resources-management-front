<template>
    <el-form ref="businesstripdetailForm" label-width="140px" :model="businesstripdetailData" v-loading="formLoading">
        <el-form-item prop="businesstripDateTimeandcheckInTypeStr" label="出差日期 :">
            <el-button style="width: 500px;display: -webkit-box;background-color: var(--el-disabled-bg-color);" disabled>{{ businesstripdetailData.beginDate+"至"+businesstripdetailData.endDate }}</el-button>
        </el-form-item>
        <el-form-item prop="duration" label="合计天数 :">
            <el-input disabled v-model="businesstripdetailData.duration" />
        </el-form-item>
        <el-form-item prop="address" label="出差目的地 :">
            <el-input disabled v-model="businesstripdetailData.address" />
        </el-form-item>
        <el-form-item prop="auditStatusStr" label="审核状态 :">
            <el-input disabled v-model="businesstripdetailData.auditStatusStr" />
        </el-form-item>
        <el-form-item prop="createTime" label="上报时间 :">
            <el-input disabled v-model="businesstripdetailData.createTime" />
        </el-form-item>
        <el-form-item prop="updateTime" label="更新时间 :">
            <el-input disabled v-model="businesstripdetailData.updateTime" />
        </el-form-item>
        <el-form-item prop="reason" label="出差事由 :">
            <el-input type="textarea" disabled  :autosize="{ minRows: 1, maxRows: 2}" resize='none' v-model="businesstripdetailData.reason" />
        </el-form-item>
        <el-form-item prop="result" label="预计出差归来结果 :">
            <el-input type="textarea" disabled  :autosize="{ minRows: 1, maxRows: 2}" resize='none' v-model="businesstripdetailData.result" />
        </el-form-item>
        <el-form-item prop="support" label="所需支持 :">
            <el-input type="textarea" disabled  :autosize="{ minRows: 1, maxRows: 2}" resize='none' v-model="businesstripdetailData.support" />
        </el-form-item>
        <el-form-item prop="auditResult" label="审核意见 :" v-show="isshowAuditResult">
            <el-input  type="textarea" disabled :autosize="{ minRows: 1, maxRows: 2}"  resize='none' v-model="businesstripdetailData.auditResult" />
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
const businesstripdetailForm = ref()
const businesstripdetailData = ref({})
const isshowAuditResult = ref(false)

if (props.id > 0) {
    formLoading.value = true;
    post(`/businesstripapply/GetBusinessTripById/${props.id}`).then(res => {
        businesstripdetailData.value = res.data
        if(businesstripdetailData.value.auditResult!=null){isshowAuditResult.value=true}
    }).finally(() => {
        formLoading.value = false;
    })
}
</script>

<style></style>