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
            <el-table border v-loading="tableLoading" :data="businesstripList" :height="tableHeight" show-overflow-tooltip>
                <el-table-column prop="id" label="序号" width="65">
                    <template #default="scope">
                        {{ (query.pageNum - 1) * query.rows + scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="businesstripDateTimeandcheckInTypeStr" label="出差日期" width="320">
                    <template #default="scope">
                        {{ scope.row.beginDate+"至"+scope.row.endDate }}
                    </template>
                </el-table-column>
                <el-table-column prop="duration" label="合计天数" width="120"/>
                <el-table-column prop="address" label="出差目的地" width="180"/>
                <el-table-column prop="auditStatusStr" label="审核状态" width="100">
                    <template #default="scope">
                        <el-text type="success" v-if="scope.row.auditStatus==2">{{scope.row.auditStatusStr}}</el-text>
                        <el-text type="danger" v-else-if="scope.row.auditStatus==3">{{scope.row.auditStatusStr}}</el-text>
                        <el-text type="primary" v-else>{{scope.row.auditStatusStr}}</el-text>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="上报时间" width="186" />
                <el-table-column prop="updateTime" label="更新时间" width="186" />
                <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                        <el-button-group v-if="scope.row.auditStatus==1">
                            <el-button type="success" size="small"
                                @click="() => { absenceAuditVisible = true ;absenceapplyauditid=scope.row.id}">审核</el-button>
                        </el-button-group>
                        <el-text  type="primary" v-else>已审核</el-text>
                        <el-button type="primary" size="small"
                                @click="() => {businesstripDetailVisible = true ;businesstripapplydetailid=scope.row.id}">查看详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="foot-panel">
                <el-pagination background layout="jumper, prev, pager, next , total ,sizes" :total="recordCount"
                    v-model:currentPage="query.pageNum" v-model:page-size="query.rows" />
            </div>
        </div>
        <div class="modal">
            <el-dialog v-model="businesstripDetailVisible" destroy-on-close title="出差审核" style="width: 600px; max-width: 100%">
                <businesstripDetail :id="businesstripapplydetailid"
                    @onClose="() => { businesstripDetailVisible = false; search() }" />
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { post, put, del } from '@/utils/request'
import { ElMessageBox } from 'element-plus'
import EnumSelect from '@/components/EnumSelect.vue'
// import businesstripDetail from './businesstripdetail.vue'
const query = reactive({
    employeeName:"",
    checkintype: -1,
    auditstatus:-1,
    pageNum: 1,
    rows: 20
})
const tableHeight = ref(0)
const tableLoading = ref(false)
const businesstripList = ref([])
const recordCount = ref(0)
const businesstripDetailVisible = ref(false)
const businesstripAddVisible = ref(false)
const businesstripapplydetailid =ref(0)

const search = async () => {
    try {
        tableLoading.value = true
        let res = await post("/businesstripapply/QueryBusinessTripListByPage", query)
        businesstripList.value = res.data
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