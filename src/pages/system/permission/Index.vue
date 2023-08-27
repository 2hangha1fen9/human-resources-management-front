<template>
    <div>
        <div class="search-panel">
            <el-form :inline="true" :model="query" class="demo-form-inline" @keyup.enter="search">
                <el-form-item label="资源类型 :">
                    <EnumSelect size="small" api="/enum/Get/PermissionType" v-model="query.type" @change="onTypeChange" />
                </el-form-item>
                <el-form-item label="权限名称 :">
                    <el-input size="small" v-model="query.name" placeholder="关键字" />
                </el-form-item>
                <el-form-item :label="`${resourceName} :`">
                    <el-input size="small" v-model="query.resource" placeholder="关键字" />
                </el-form-item>
                <el-form-item label="公共权限 :">
                    <EnumSelect size="small" api="/enum/Get/YesOrNo" v-model="query.isPublic" />
                </el-form-item>
                <el-form-item label="状态 :">
                    <EnumSelect size="small" api="/enum/Get/DataStatus" v-model="query.status" />
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" @click="search">搜索</el-button>
                </el-form-item>
                <el-form-item v-if="query.type != 1">
                    <el-button size="small" type="success"
                        @click="() => { currentPermissionId = 0; permissionEditVisible = true }">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-panel">
            <el-table border v-loading="tableLoading" :data="permissionList" :height="tableHeight" show-overflow-tooltip>
                <el-table-column prop="id" label="序号" width="65">
                    <template #default="scope">
                        {{ (query.pageNum - 1) * query.rows + scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="权限名" width="200" />
                <el-table-column prop="resource" :label="`${resourceName}`" width="300" />
                <el-table-column prop="typeStr" label="资源类型" width="100" />
                <el-table-column prop="isPublicStr" label="公共权限" width="100" />
                <el-table-column prop="statusStr" label="状态" width="100" />
                <el-table-column prop="createTime" label="创建时间" width="200" />
                <el-table-column prop="updateTime" label="更新时间" width="200" />
                <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                        <el-button-group>
                            <el-button type="primary" size="small"
                                @click="() => { currentPermissionId = scope.row.id; permissionEditVisible = true }">修改</el-button>
                            <el-button type="danger" size="small" @click="deletePermission(scope.row)"
                                v-show="scope.row.type !== 1">删除</el-button>
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
            <el-dialog v-model="permissionEditVisible" destroy-on-close title="权限编辑" style="width: 600px; max-width: 100%">
                <PermissionEdit :permissionId="currentPermissionId"
                    @onClose="() => { currentPermissionId = 0; permissionEditVisible = false; search() }" />
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { post, del } from '@/utils/request'
import { ElMessageBox } from 'element-plus'
import EnumSelect from '@/components/EnumSelect.vue'
import PermissionEdit from './PermissionEdit.vue'

const query = reactive({
    name: "",
    resource: "",
    status: -1,
    isPublic: -1,
    type: 1,
    pageNum: 1,
    rows: 20
})
const tableHeight = ref(0)
const tableLoading = ref(false)
const permissionList = ref([])
const recordCount = ref(0)
const permissionEditVisible = ref(false)
const currentPermissionId = ref(0)
const resourceName = ref("API路径")

const search = async () => {
    try {
        tableLoading.value = true
        let res = await post("/permission/QueryPermissionByPage", query)
        permissionList.value = res.data
        recordCount.value = res.recordCount
    } finally {
        tableLoading.value = false
    }
}
const deletePermission = async (row) => {
    if (row.id) {
        try {
            await ElMessageBox.confirm(`确认删除权限 ${row.name} ?'`)
            await del(`/permission/deletePermission/${row.id}`)
            let index = permissionList.value.findIndex(i => i.id === row.id)
            permissionList.value.splice(index, 1)
        }
        catch (e) { }
    }
}
const onTypeChange = option => {
    if (option) {
        resourceName.value = option.desction
    }
    else {
        resourceName.value = "API路径"
    }
    search()
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