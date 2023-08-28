<template>
    <div>
        <el-transfer v-loading="formLoading" v-model="rolePermission" :props="{ key: 'id', label: 'name', }"
            :data="allPermission" :titles="['所有权限', `${role.name}的权限`]" :filterable="true" :filter-method="filterMethod"
            :format="{ noChecked: '${total}', hasChecked: '${total}', }" :button-texts="['解绑', '绑定']" class="transfer" />
        <EltTransfer />
        <div class="submit">
            <el-button @click="emit('onClose')">取消</el-button>
            <el-button type="primary" :loading="buttonLoading" @click="save">提交</el-button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { post, get } from '@/utils/request'
import { ElMessage } from 'element-plus'
import EnumSelect from '@/components/EnumSelect.vue'

const props = defineProps({
    role: {
        type: Object,
        default: {}
    }
})
const emit = defineEmits(['onClose'])

const formLoading = ref(false)
const buttonLoading = ref(false)
//用户权限
const rolePermission = ref([])
//所有权限
const allPermission = ref([])

const getRolePermission = async () => {
    try {
        formLoading.value = true
        let res = await get(`/permission/GetPermissionsByRoleId/${props.role.id}`)
        rolePermission.value = res.data.map(r => r.id)
    } finally {
        formLoading.value = false
    }
}
const getPermission = async () => {
    try {
        formLoading.value = true
        let res = await post('/permission/QueryPermissionByPage', {
            rows: 0,

        })
        allPermission.value = res.data.map(({ id, name, typeStr, resource }) => ({ id, name: `[${typeStr}]${name} ${resource}`, }))
    } finally {
        formLoading.value = false
    }
}
const save = async () => {
    try {
        buttonLoading.value = true
        await post('/auth/RolePermissionBind', {
            roleId: props.role.id,
            permissionIds: rolePermission.value
        })
        ElMessage.success("权限绑定成功")
        emit("onClose")
    } finally {
        buttonLoading.value = false
    }
}

getPermission()
getRolePermission()
</script>

<style scoped>
.submit {
    margin: 10px;
    display: flex;
    justify-content: flex-end;
}

.transfer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 100%;
}

.transfer>>>.el-transfer__buttons {
    display: flex;
}

.transfer>>>.el-transfer-panel {
    width: 50%;
}
</style>