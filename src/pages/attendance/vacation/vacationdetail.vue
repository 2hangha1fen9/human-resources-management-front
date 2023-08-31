<template>
    <el-descriptions v-loading="formLoading" :column="2" border>
        <el-descriptions-item label="休假日期" :span="2">
            {{ moment(vacationdetailData.beginDate).format('YYYY-MM-DD') + "至" +
                moment(vacationdetailData.endDate).format('YYYY-MM-DD') }}({{ vacationdetailData.duration }})
        </el-descriptions-item>
        <el-descriptions-item label="休假类型">
            {{ vacationdetailData.vacationTypeStr }}
        </el-descriptions-item>
        <el-descriptions-item label="审核状态">
            {{ vacationdetailData.auditStatusStr }}
        </el-descriptions-item>
        <el-descriptions-item label="上报时间">
            {{ vacationdetailData.createTime }}
        </el-descriptions-item>
        <el-descriptions-item label="更新时间">
            {{ vacationdetailData.updateTime }}
        </el-descriptions-item>
        <el-descriptions-item label="休假事由" :span="2">
            {{ vacationdetailData.reason }}
        </el-descriptions-item>
        <el-descriptions-item label="审核意见" :span="2">
            {{ vacationdetailData.auditResult }}
        </el-descriptions-item>
    </el-descriptions>
    <el-timeline style="margin-top:30px">
        <el-timeline-item v-for="(node, index) in vacationdetailData.auditNode" :key="index" :timestamp="node.auditTime"
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

const formLoading = ref(false)
const vacationdetailData = ref({})
const stateColor = {
    1: "#d1dbe5",
    2: "#67c23a",
    3: "#f56c6c",
}

if (props.id > 0) {
    formLoading.value = true;
    post(`/vacationapply/GetVacationById/${props.id}`).then(res => {
        vacationdetailData.value = res.data
    }).finally(() => {
        formLoading.value = false;
    })
}
</script>

<style></style>