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
                <el-form-item label="休假类型 :">
                    <EnumSelect size="small" api="/enum/Get/VacationType" v-model="query.vacationtype" />
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
            <el-table border v-loading="tableLoading" :data="vacationList" :height="tableHeight" show-overflow-tooltip>
                <el-table-column prop="id" label="序号" width="65">
                    <template #default="scope">
                        {{ (query.pageNum - 1) * query.rows + scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="employeeName" label="申请人" width="100" />
                <el-table-column prop="departmentName" label="部门" width="100" />
                <el-table-column prop="vacationDateTimeandcheckInTypeStr" label="休假日期" width="320">
                    <template #default="scope">
                        {{ scope.row.beginDate + " 到 " + scope.row.endDate }}
                    </template>
                </el-table-column>
                <el-table-column prop="duration" label="合计天数" width="120" />
                <el-table-column prop="vacationTypeStr" label="休假类型" width="120" />
                <el-table-column prop="auditStatusStr" label="审核状态" width="100">
                    <template #default="scope">
                        <el-text type="success" v-if="scope.row.auditStatus == 2">{{ scope.row.auditStatusStr }}</el-text>
                        <el-text type="danger" v-else-if="scope.row.auditStatus == 3">{{ scope.row.auditStatusStr }}</el-text>
                        <el-text type="primary" v-else>{{ scope.row.auditStatusStr }}</el-text>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="上报时间" width="200" />
                <el-table-column prop="updateTime" label="更新时间" width="200" />
                <el-table-column fixed="right" label="操作" width="140">
                    <template #default="scope">
                        <el-button-group>
                            <el-button type="success" size="small" v-if="scope.row.auditStatus == 1"
                                @click="() => { vacationAuditVisible = true; vacationapplyid = scope.row.id }">审核</el-button>
                            <el-text type="primary" v-else>已审核&nbsp;</el-text>
                            <el-button type="primary" size="small"
                                @click="() => { vacationDetailVisible = true; vacationapplyid = scope.row.id }">查看详情</el-button>
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
            <el-dialog v-model="vacationAuditVisible" destroy-on-close title="休假申请详情" style="width: 600px; max-width: 100%">
                <vacationAudit :id="vacationapplyid" @onClose="() => { vacationAuditVisible = false; search() }" />
            </el-dialog>
            <el-dialog v-model="vacationDetailVisible" destroy-on-close title="休假申请详情"
                style="width: 600px; max-width: 100%">
                <vacationDetail :id="vacationapplyid" @onClose="() => { vacationDetailVisible = false; search() }" />
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { post, put, del } from '@/utils/request'
import { ElMessageBox } from 'element-plus'
import EnumSelect from '@/components/EnumSelect.vue'
import vacationAudit from './vacationAudit.vue'
import vacationDetail from '../../attendance/vacation/vacationdetail.vue'

const query = reactive({
    employeeName: "",
    vacationtype: -1,
    auditstatus: -1,
    pageNum: 1,
    rows: 20
})
const tableHeight = ref(0)
const tableLoading = ref(false)
const vacationList = ref([])
const recordCount = ref(0)
const vacationAuditVisible = ref(false)
const vacationDetailVisible = ref(false)
const vacationapplyid = ref(0)

const search = async () => {
    try {
        tableLoading.value = true
        let res = await post("/vacationapply/QueryVacationListByPage", query)
        vacationList.value = res.data
        console.log(vacationList.value)
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