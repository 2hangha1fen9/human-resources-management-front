<template>
    <el-descriptions border v-loading="formLoading" :column="1">
        <el-descriptions-item label="上班日期 :">
            {{ compensatorydetailData.workDate }}
        </el-descriptions-item>
        <el-descriptions-item label="倒休日期 :">
            {{ compensatorydetailData.restDate }}
        </el-descriptions-item>
        <el-descriptions-item label="工作安排 :">
            {{ compensatorydetailData.workPlan }}
        </el-descriptions-item>
        <el-descriptions-item label="审核状态 :">
            {{ compensatorydetailData.auditStatusStr }}
        </el-descriptions-item>
        <el-descriptions-item label="上报时间 :">
            {{ compensatorydetailData.createTime }}
        </el-descriptions-item>
        <el-descriptions-item label="更新时间 :">
            {{ compensatorydetailData.updateTime }}
        </el-descriptions-item>
        <el-descriptions-item label="审核意见 :">
            {{ compensatorydetailData.auditResul }}
        </el-descriptions-item>
    </el-descriptions>
    <el-timeline style="margin-top:30px">
        <el-timeline-item v-for="(node, index) in compensatorydetailData.auditNode" :key="index" :timestamp="node.auditTime"
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
import moment from 'moment'
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
const compensatorydetailData = ref({})

if (props.id > 0) {
    formLoading.value = true;
    post(`/compensatoryapply/GetCompensatoryById/${props.id}`).then(res => {
        compensatorydetailData.value = res.data
        compensatorydetailData.value.workDate = moment(compensatorydetailData.value.workDate).format("YYYY-MM-DD")
        compensatorydetailData.value.restDate = moment(compensatorydetailData.value.restDate).format("YYYY-MM-DD")
    }).finally(() => {
        formLoading.value = false;
    })
}
</script>

<style></style>