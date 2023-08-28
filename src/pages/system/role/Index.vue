<template>
    <div>
        <div class="search-panel">
            <el-form :inline="true" :model="query" class="demo-form-inline" @keyup.enter="search">
                <el-form-item label="角色名 :">
                    <el-input size="small" v-model="query.name" placeholder="关键字" />
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
                        @click="() => { currentRole = {}; roleEditVisible = true }">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-panel">
            <el-table border v-loading="tableLoading" :data="roleList" :height="tableHeight" show-overflow-tooltip>
                <el-table-column prop="id" label="序号" width="65">
                    <template #default="scope">
                        {{ (query.pageNum - 1) * query.rows + scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="角色名" width="200" />
                <el-table-column prop="statusStr" label="状态" width="100" />
                <el-table-column prop="isDefaultStr" label="是否默认" width="100" />
                <el-table-column prop="createTime" label="创建时间" width="200" />
                <el-table-column prop="updateTime" label="更新时间" width="200" />
                <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                        <el-button-group>
                            <el-button type="success" size="small"
                                @click="() => { currentRole = scope.row; bindEditVisible = true }">绑定权限</el-button>
                            <el-button type="primary" size="small"
                                @click="() => { currentRole = scope.row; roleEditVisible = true }">修改</el-button>
                            <el-button type="danger" size="small" @click="deleteRole(scope.row)">删除</el-button>
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
            <el-dialog v-model="roleEditVisible" destroy-on-close title="角色编辑" style="width: 600px; max-width: 100%">
                <RoleEdit :roleId="currentRole.id"
                    @onClose="() => { currentRole = {}; roleEditVisible = false; search() }" />
            </el-dialog>
            <el-dialog v-model="bindEditVisible" destroy-on-close title="权限绑定" style="width: 1000px; max-width: 100%">
                <RolePermissionBind :role="currentRole" @onClose="() => { currentRole = {}; bindEditVisible = false }" />
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { post, del } from '@/utils/request'
import { ElMessageBox } from 'element-plus'
import EnumSelect from '@/components/EnumSelect.vue'
import RoleEdit from './RoleEdit.vue'
import RolePermissionBind from './RolePermissionBind.vue'

const query = reactive({
    name: "",
    status: -1,
    isDefault: -1,
    pageNum: 1,
    rows: 20
})
const tableHeight = ref(0)
const tableLoading = ref(false)
const roleList = ref([])
const recordCount = ref(0)
const roleEditVisible = ref(false)
const bindEditVisible = ref(false)
const currentRole = ref({})

const search = async () => {
    try {
        tableLoading.value = true
        let res = await post("/role/QueryRoleByPage", query)
        roleList.value = res.data
        recordCount.value = res.recordCount
    } finally {
        tableLoading.value = false
    }
}
const deleteRole = async (row) => {
    if (row.id) {
        try {
            await ElMessageBox.confirm(`确认删除角色 ${row.name} ?'`)
            await del(`/role/deleteRole/${row.id}`)
            let index = roleList.value.findIndex(i => i.id === row.id)
            roleList.value.splice(index, 1)
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