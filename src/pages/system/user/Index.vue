<template>
    <div>
        <div class="search-panel">
            <el-form :inline="true" :model="query" class="demo-form-inline" @keyup.enter="search">
                <el-form-item label="登录名 :">
                    <el-input size="small" v-model="query.loginName" placeholder="关键字" />
                </el-form-item>
                <el-form-item label="状态 :">
                    <EnumSelect size="small" api="/enum/Get/DataStatus" v-model="query.status" />
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary" @click="search">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="success"
                        @click="() => { currentUser = {}; userEditVisible = true }">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-panel">
            <el-table border v-loading="tableLoading" :data="userList" :height="tableHeight" show-overflow-tooltip>
                <el-table-column prop="id" label="序号" width="65">
                    <template #default="scope">
                        {{ (query.pageNum - 1) * query.rows + scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="loginName" label="登录名" width="200" />
                <el-table-column prop="statusStr" label="状态" width="100">
                    <template #default="scope">
                        <el-switch v-model="scope.row.status" inline-prompt active-text="启用" :active-value="1"
                            inactive-text="禁用" :inactive-value="2" :loading="scope.row.loading"
                            @change="changeStatus(scope.row)" />
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="200" />
                <el-table-column prop="updateTime" label="更新时间" width="200" />
                <el-table-column fixed="right" label="操作">
                    <template #default="scope">
                        <el-button-group>
                            <el-button type="success" size="small"
                                @click="() => { currentUser = scope.row; bindEditVisible = true }">绑定角色</el-button>
                            <el-button type="primary" size="small"
                                @click="() => { currentUser = scope.row; userEditVisible = true }">修改</el-button>
                            <el-button type="danger" size="small" @click="deleteUser(scope.row)">删除</el-button>
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
            <el-dialog v-model="userEditVisible" destroy-on-close title="用户编辑" style="width: 600px; max-width: 100%">
                <UserEdit :userId="currentUser.id || 0"
                    @onClose="() => { currentUser = {}; userEditVisible = false; search() }" />
            </el-dialog>
            <el-dialog v-model="bindEditVisible" destroy-on-close title="角色绑定" style="width: 800px; max-width: 100%">
                <UserRoleBind :user="currentUser" @onClose="() => { currentUser = {}; bindEditVisible = false }" />
            </el-dialog>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'
import { post, put, del } from '@/utils/request'
import { ElMessageBox } from 'element-plus'
import EnumSelect from '@/components/EnumSelect.vue'
import UserEdit from './UserEdit.vue'
import UserRoleBind from './UserRoleBind.vue'

const query = reactive({
    loginName: "",
    status: -1,
    pageNum: 1,
    rows: 20
})
const tableHeight = ref(0)
const tableLoading = ref(false)
const userList = ref([])
const recordCount = ref(0)
const userEditVisible = ref(false)
const bindEditVisible = ref(false)
const currentUser = ref({})

const search = async () => {
    try {
        tableLoading.value = true
        let res = await post("/user/QueryUserByPage", query)
        userList.value = res.data
        recordCount.value = res.recordCount
    } finally {
        tableLoading.value = false
    }
}
const changeStatus = async (row) => {
    try {
        row.loading = true
        await put("/user/ChangeStatus", {
            id: row.id,
            status: row.status
        })
    } finally {
        row.loading = false
    }
}
const deleteUser = async (row) => {

    if (row.id) {
        try {
            await ElMessageBox.confirm(`确认删除用户 ${row.loginName} ?'`)
            console.log(row.id)
            await del(`/user/deleteUser/${row.id}`)
            let index = userList.value.findIndex(i => i.id === row.id)
            userList.value.splice(index, 1)
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