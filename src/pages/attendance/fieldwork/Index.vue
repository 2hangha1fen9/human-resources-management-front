<template>
    <div>
        <div class="search-panel">
            <el-form :inline="true" :model="query" class="demo-form-inline" @keyup.enter="search">
                <el-form-item label="上报时间 :">
                    <el-date-picker type="date" placeholder="选择时间" value-format="YYYY-MM-DD" format="YYYY-MM-DD" size="small" v-model="query.createTime"/>
                </el-form-item>
                <el-form-item label="审核状态 :">
                    <EnumSelect size="small" api="/enum/Get/AuditStatus" v-model="query.auditstatus" />
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" @click="search">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="success"
                        @click="() => {fieldworkAddVisible = true }">申请</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-panel">
            <el-table border v-loading="tableLoading" :data="fieldworkList" :height="tableHeight" show-overflow-tooltip>
                <el-table-column prop="id" label="序号" width="65">
                    <template #default="scope">
                        {{ (query.pageNum - 1) * query.rows + scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="fieldworkDateTimeandcheckInTypeStr" label="外勤日期" width="320">
                    <template #default="scope">
                        {{ scope.row.beginDate+"至"+scope.row.endDate }}
                    </template>
                </el-table-column>
                <el-table-column prop="duration" label="合计天数" width="120"/>
                <el-table-column prop="address" label="外勤目的地" width="180"/>
                <el-table-column prop="auditStatusStr" label="审核状态" width="100"/>
                <el-table-column prop="createTime" label="上报时间" width="186" />
                <el-table-column prop="updateTime" label="更新时间" width="186" />
                <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                        <el-button-group>
                            <el-button type="primary" size="small"
                                @click="() => {fieldworkDetailVisible = true ;fieldworkapplydetailid=scope.row.id}">查看详情</el-button>
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
            <el-dialog v-model="fieldworkDetailVisible" destroy-on-close title="外勤申请详情" style="width: 600px; max-width: 100%">
                <fieldworkDetail :id="fieldworkapplydetailid"
                    @onClose="() => { fieldworkDetailVisible = false; search() }" />
            </el-dialog>
            <el-dialog v-model="fieldworkAddVisible" destroy-on-close title="出差申请" style="width: 600px; max-width: 100%">
                <fieldworkAdd
                    @onClose="() => { fieldworkAddVisible = false; search() }" />
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { post, put, del } from '@/utils/request'
import { ElMessageBox } from 'element-plus'
import EnumSelect from '@/components/EnumSelect.vue'
import fieldworkDetail from './fieldworkdetail.vue'
import fieldworkAdd from './fieldworkAdd.vue'

const query = reactive({
    createTime:"",
    auditstatus:-1,
    pageNum: 1,
    rows: 20
})
const tableHeight = ref(0)
const tableLoading = ref(false)
const fieldworkList = ref([])
const recordCount = ref(0)
const fieldworkDetailVisible = ref(false)
const fieldworkAddVisible = ref(false)
const currentfieldwork = ref({})
const fieldworkapplydetailid =ref(0)

const search = async () => {
    try {
        tableLoading.value = true
        let res = await post("/fieldWorkapply/QueryMyFieldWorkListByPage", query)
        fieldworkList.value = res.data
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