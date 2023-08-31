<template>
    <el-descriptions border v-loading="formLoading" :column="1">
        <el-descriptions-item label="出差日期 :" min-width="100px">
            {{ moment(businesstripdetailData.beginDate).format('YYYY-MM-DD') + "至" +
                moment(businesstripdetailData.endDate).format('YYYY-MM-DD') }}
        </el-descriptions-item>
        <el-descriptions-item label="合计天数 :">
            {{ businesstripdetailData.duration }}
        </el-descriptions-item>
        <el-descriptions-item label="目的地 :">
            {{ businesstripdetailData.address }}
        </el-descriptions-item>
        <el-descriptions-item label="审核状态 :">
            {{ businesstripdetailData.auditStatusStr }}
        </el-descriptions-item>
        <el-descriptions-item label="上报时间 :">
            {{ businesstripdetailData.createTime }}
        </el-descriptions-item>
        <el-descriptions-item label="更新时间 :">
            {{ businesstripdetailData.updateTime }}
        </el-descriptions-item>
        <el-descriptions-item label="出差事由 :">
            {{ businesstripdetailData.reason }}
        </el-descriptions-item>
        <el-descriptions-item label="归来结果 :">
            {{ businesstripdetailData.result }}
        </el-descriptions-item>
        <el-descriptions-item label="所需支持 :">
            {{ businesstripdetailData.support }}
        </el-descriptions-item>
        <el-descriptions-item label="审核意见 :">
            {{ businesstripdetailData.auditResult }}
        </el-descriptions-item>
    </el-descriptions>
    <el-timeline style="margin-top:30px">
        <el-timeline-item v-for="(node, index) in businesstripdetailData.auditNode" :key="index" :timestamp="node.auditTime"
            :color="stateColor[node.auditStatus]">
            <div>
                <p>{{ node.roleName }} {{ node.userName }} [{{ node.auditStatusStr }}]</p>
                <p>
                    审核结果: {{ node.auditResult }}
                </p>
            </div>
        </el-timeline-item>
    </el-timeline>
</template>

<script setup>
import { ref } from 'vue'
import { get, post, put } from "@/utils/request"
import { ElMessage } from 'element-plus';
import moment from 'moment';
const props = defineProps({
    id: Number,
    default: 0
})

const stateColor = {
    1: "#d1dbe5",
    2: "#67c23a",
    3: "#f56c6c",
}
const formLoading = ref(false)
const businesstripdetailData = ref({})

if (props.id > 0) {
    formLoading.value = true;
    post(`/businesstripapply/GetBusinessTripById/${props.id}`).then(res => {
        businesstripdetailData.value = res.data
    }).finally(() => {
        formLoading.value = false;
    })
}
</script>

<style></style>