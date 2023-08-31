<template>
    <div>
        <div class="search-panel">
            <el-form :inline="true" :model="query" class="demo-form-inline" @keyup.enter="search">
                <el-form-item label="员工姓名 :">
                    <el-input size="small" v-model="query.employeeName" placeholder="输入姓名" />
                </el-form-item>
                <el-form-item label="部门 :">
                    <EnumSelect size="small" api="/department/QueryDepartmentByPage" v-model="query.departmentId" keys="id"
                        values="departmentName" :request="post" :params="{ rows: 0 }" />
                </el-form-item>
                <el-form-item label="打卡类型 :">
                    <EnumSelect size="small" api="/enum/Get/CheckInType" v-model="query.checkintype" />
                </el-form-item>
                <el-form-item label="审核状态 :">
                    <EnumSelect size="small" api="/enum/Get/AuditStatus" v-model="query.auditstatus" />
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" @click="search">搜索</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-panel">
            <el-table border v-loading="tableLoading" :data="absenceList" :height="tableHeight" show-overflow-tooltip>
                <el-table-column prop="id" label="序号" width="60">
                    <template #default="scope">
                        {{ (query.pageNum - 1) * query.rows + scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="employeeName" label="申请人" width="100" />
                <el-table-column prop="departmentName" label="部门" width="100" />
                <el-table-column prop="absenceDateTimeandcheckInTypeStr" label="缺打考勤时间" width="210">
                    <template #default="scope">
                        {{ scope.row.absenceDateTime + scope.row.checkInTypeStr }}
                    </template>
                </el-table-column>
                <el-table-column prop="reason" label="缺打事由" width="212" />
                <el-table-column prop="prover" label="证明人" width="96" />
                <el-table-column prop="auditStatusStr" label="审核状态" width="90">
                    <template #default="scope">
                        <el-text type="success" v-if="scope.row.auditStatus == 2">{{ scope.row.auditStatusStr }}</el-text>
                        <el-text type="danger" v-else-if="scope.row.auditStatus == 3">{{ scope.row.auditStatusStr }}</el-text>
                        <el-text type="primary" v-else>{{ scope.row.auditStatusStr }}</el-text>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="上报时间" width="168" />
                <el-table-column prop="updateTime" label="更新时间" width="168" />
                <el-table-column fixed="right" label="操作" width="140">
                    <template #default="scope">
                        <el-button-group>
                            <el-button type="success" size="small" v-if="scope.row.auditStatus == 1"
                                @click="() => { absenceAuditVisible = true; absenceapplyid = scope.row.id }">审核</el-button>
                                <el-text type="primary" v-else>已审核&nbsp;</el-text>
                            <el-button type="primary" size="small"
                                @click="() => { absenceDetailVisible = true; absenceapplyid = scope.row.id }">查看详情</el-button>
                        </el-button-group>
                    </template>
                </el-table-column>
            </el-table>
            <div class="foot-panel">
                <el-pagination background layout="jumper, prev, pager, next , total ,sizes" :total="recordCount"
                    v-model:currentPage="query.pageNum" v-model:page-size="query.rows" />
            </div>
        </div>
        <div class="modal">
            <el-dialog v-model="absenceAuditVisible" destroy-on-close title="缺勤审核" style="width: 600px; max-width: 100%">
                <AbsenceAudit :id="absenceapplyid" @onClose="() => { absenceAuditVisible = false; search() }" />
            </el-dialog>
            <el-dialog v-model="absenceDetailVisible" destroy-on-close title="缺勤申请详情" style="width: 600px; max-width: 100%">
                <AbsenceDetail :id="absenceapplyid" @onClose="() => { absenceDetailVisible = false; search() }" />
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { post, put, del } from '@/utils/request'
import { ElMessageBox } from 'element-plus'
import EnumSelect from '@/components/EnumSelect.vue'
import AbsenceAudit from './absenceAudit.vue'
import AbsenceDetail from '../../attendance/absence/absencedetail.vue'

const query = reactive({
    employeeName: "",
    checkintype: -1,
    auditstatus: -1,
    pageNum: 1,
    rows: 20
})
const tableHeight = ref(0)
const tableLoading = ref(false)
const absenceList = ref([])
const recordCount = ref(0)
const absenceAuditVisible = ref(false)
const absenceDetailVisible = ref(false)
const absenceapplyid = ref(0)

const search = async () => {
    try {
        tableLoading.value = true
        let res = await post("/absenceapply/QueryAbsenceListByPage", query)
        absenceList.value = res.data
        console.log(absenceList.value)
        recordCount.value = res.recordCount
    } finally {
        tableLoading.value = false
    }
}
const setTableHeight = () => {
    let tableHeader = document.querySelector(".el-table__header-wrapper")
    let tableHeaderHeight = tableHeader.getBoundingClientRect().height
    let bottom = window.innerHeight - tableHeader.getBoundingClientRect().y - (tableHeaderHeight == 0 ? 40 : tableHeaderHeight)
    tableHeight.value = bottom - 25
}

watch([() => query.pageNum, () => query.rows], () => {
    search()
})
onMounted(() => {
    window.addEventListener("resize", setTableHeight)
    setTableHeight()
})
onUnmounted(() => {
    window.removeEventListener("resize", setTableHeight)
})

search()
</script>

<style></style>