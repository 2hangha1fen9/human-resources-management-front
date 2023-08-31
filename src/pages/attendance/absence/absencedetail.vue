<template>
    <el-descriptions v-loading="formLoading" border :column="2">
        <el-descriptions-item label="缺打考勤时间" :span="2">
            {{ absencedetailData.absenceDateTime }}[{{ absencedetailData.checkInTypeStr }}]
        </el-descriptions-item>
        <el-descriptions-item label="证明人">
            {{ absencedetailData.prover }}
        </el-descriptions-item>
        <el-descriptions-item label="审核状态">
            {{ absencedetailData.auditStatusStr }}
        </el-descriptions-item>
        <el-descriptions-item label="上报时间">
            {{ absencedetailData.createTime }}
        </el-descriptions-item>
        <el-descriptions-item label="更新时间">
            {{ absencedetailData.updateTime }}
        </el-descriptions-item>
        <el-descriptions-item label="缺打事由">
            {{ absencedetailData.reason }}
        </el-descriptions-item>
        <el-descriptions-item label="审核意见" :span="2">
            {{ absencedetailData.auditResult }}
        </el-descriptions-item>
    </el-descriptions>
    <el-timeline style="margin-top:30px">
        <el-timeline-item v-for="(node, index) in absencedetailData.auditNode" :key="index" :timestamp="node.auditTime"
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
const absencedetailData = ref({})

if (props.id > 0) {
    formLoading.value = true;
    post(`/absenceapply/GetAbsenceById/${props.id}`).then(res => {
        absencedetailData.value = res.data
    }).finally(() => {
        formLoading.value = false;
    })
}
</script>

<style></style>