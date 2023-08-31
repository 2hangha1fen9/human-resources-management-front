<template>
    <el-descriptions v-loading="formLoading" border :column="2">
        <el-descriptions-item label="外勤日期" :span="2">
            {{ moment(fieldworkdetailData.beginDate).format('YYYY-MM-DD') + "至" +
                moment(fieldworkdetailData.endDate).format('YYYY-MM-DD') }}({{ fieldworkdetailData.duration }})
        </el-descriptions-item>
        <el-descriptions-item label="目的地" :span="2">
            {{ fieldworkdetailData.address }}
        </el-descriptions-item>
        <el-descriptions-item label="审核状态">
            {{ fieldworkdetailData.auditStatusStr }}
        </el-descriptions-item>
        <el-descriptions-item label="上报时间">
            {{ fieldworkdetailData.createTime }}
        </el-descriptions-item>
        <el-descriptions-item label="更新时间">
            {{ fieldworkdetailData.updateTime }}
        </el-descriptions-item>
        <el-descriptions-item label="外勤事由" :span="2">
            {{ fieldworkdetailData.reason }}
        </el-descriptions-item>
        <el-descriptions-item label="审核意见" :span="2">
            {{ fieldworkdetailData.auditResult }}
        </el-descriptions-item>
    </el-descriptions>
    <el-timeline style="margin-top:30px">
        <el-timeline-item v-for="(node, index) in fieldworkdetailData.auditNode" :key="index" :timestamp="node.auditTime"
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
const emit = defineEmits(['onClose'])
const stateColor = {
    1: "#d1dbe5",
    2: "#67c23a",
    3: "#f56c6c",
}
const formLoading = ref(false)
const fieldworkdetailData = ref({})

if (props.id > 0) {
    formLoading.value = true;
    post(`/fieldWorkapply/GetFieldWorkById/${props.id}`).then(res => {
        fieldworkdetailData.value = res.data
    }).finally(() => {
        formLoading.value = false;
    })
}
</script>

<style></style>