<template>
    <div>
        <div class="search-panel">
            <el-form :inline="true" :model="query" class="demo-form-inline" @keyup.enter="search">
                <el-form-item label="岗位名 :">
                    <el-input size="small" v-model="query.positionName" placeholder="关键字" />
                </el-form-item>
                <el-form-item label="状态 :">
                    <EnumSelect size="small" api="/enum/Get/DataStatus" v-model="query.status" />
                </el-form-item>
                <el-form-item label="是否默认 :">
                    <EnumSelect size="small" api="/enum/Get/YesOrNo" v-model="query.isDefault" />
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" @click="search">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="success"
                        @click="() => { currentPosition = {}; positionEditVisible = true }">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-panel">
            <el-table border v-loading="tableLoading" :data="positionList" :height="tableHeight" show-overflow-tooltip>
                <el-table-column prop="id" label="序号" width="65">
                    <template #default="scope">
                        {{ (query.pageNum - 1) * query.rows + scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="positionName" label="岗位名" width="200" />
                <el-table-column prop="statusStr" label="状态" width="100" />
                <el-table-column prop="createTime" label="创建时间" width="200" />
                <el-table-column prop="updateTime" label="更新时间" width="200" />
                <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                        <el-button-group>
                            <el-button type="primary" size="small"
                                @click="() => { currentPosition = scope.row; positionEditVisible = true }">修改</el-button>
                            <el-button type="danger" size="small" @click="deletePosition(scope.row)">删除</el-button>
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
            <el-dialog v-model="positionEditVisible" destroy-on-close title="岗位编辑" style="width: 600px; max-width: 100%">
                <PositionEdit :positionId="currentPosition.id"
                    @onClose="() => { currentPosition = {}; positionEditVisible = false; search() }" />
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { post, del } from '@/utils/request'
import { ElMessageBox } from 'element-plus'
import EnumSelect from '@/components/EnumSelect.vue'
import PositionEdit from './PositionEdit.vue'

const query = reactive({
    positionName: "",
    status: -1,
    pageNum: 1,
    rows: 20
})
const tableHeight = ref(0)
const tableLoading = ref(false)
const positionList = ref([])
const recordCount = ref(0)
const positionEditVisible = ref(false)
const currentPosition = ref({})

const search = async () => {
    try {
        tableLoading.value = true
        let res = await post("/position/QueryPositionByPage", query)
        positionList.value = res.data
        recordCount.value = res.recordCount
    } finally {
        tableLoading.value = false
    }
}
const deletePosition = async (row) => {
    if (row.id) {
        try {
            await ElMessageBox.confirm(`确认删除岗位 ${row.positionName} ?'`)
            await del(`/position/deletePosition/${row.id}`)
            let index = positionList.value.findIndex(i => i.id === row.id)
            positionList.value.splice(index, 1)
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