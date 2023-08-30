<template>
    <div>
        <div class="search-panel">
            <el-form :inline="true" :model="query" class="demo-form-inline" @keyup.enter="search">
                <el-form-item label="部门名 :">
                    <el-input size="small" v-model="query.departmentName" placeholder="关键字" />
                </el-form-item>
                <el-form-item label="状态 :">
                    <EnumSelect size="small" api="/enum/Get/DataStatus" v-model="query.status" />
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" @click="search">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="success"
                        @click="() => { currentDepartment = {}; departmentEditVisible = true }">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-panel">
            <el-table border v-loading="tableLoading" :data="departmentList" :height="tableHeight" show-overflow-tooltip>
                <el-table-column prop="id" label="序号" width="65">
                    <template #default="scope">
                        {{ (query.pageNum - 1) * query.rows + scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="departmentName" label="部门名" width="200" />
                <el-table-column prop="statusStr" label="状态" width="100" />
                <el-table-column prop="createTime" label="创建时间" width="200" />
                <el-table-column prop="updateTime" label="更新时间" width="200" />
                <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                        <el-button-group>
                            <el-button type="primary" size="small"
                                @click="() => { currentDepartment = scope.row; departmentEditVisible = true }">修改</el-button>
                            <el-button type="danger" size="small" @click="deleteDepartment(scope.row)">删除</el-button>
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
            <el-dialog v-model="departmentEditVisible" destroy-on-close title="部门编辑" style="width: 600px; max-width: 100%">
                <DepartmentEdit :departmentId="currentDepartment.id"
                    @onClose="() => { currentDepartment = {}; departmentEditVisible = false; search() }" />
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { post, del } from '@/utils/request'
import { ElMessageBox } from 'element-plus'
import EnumSelect from '@/components/EnumSelect.vue'
import DepartmentEdit from './DepartmentEdit.vue'

const query = reactive({
    departmentName: "",
    status: -1,
    pageNum: 1,
    rows: 20
})
const tableHeight = ref(0)
const tableLoading = ref(false)
const departmentList = ref([])
const recordCount = ref(0)
const departmentEditVisible = ref(false)
const currentDepartment = ref({})

const search = async () => {
    try {
        tableLoading.value = true
        let res = await post("/department/QueryDepartmentByPage", query)
        departmentList.value = res.data
        recordCount.value = res.recordCount
    } finally {
        tableLoading.value = false
    }
}
const deleteDepartment = async (row) => {
    if (row.id) {
        try {
            await ElMessageBox.confirm(`确认删除部门 ${row.departmentName} ?'`)
            await del(`/department/deleteDepartment/${row.id}`)
            let index = departmentList.value.findIndex(i => i.id === row.id)
            departmentList.value.splice(index, 1)
        }
        catch (e) { }
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

<style>
.el-transfer-panel {
    width: 300px;
}

.el-transfer-panel__body {
    height: 400px;
}

.el-transfer-panel__list {
    height: 400px;
}
</style>