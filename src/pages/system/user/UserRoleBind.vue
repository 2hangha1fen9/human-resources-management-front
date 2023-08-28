<template>
    <div>
        <el-transfer v-loading="formLoading" v-model="userRoles" :filterable="true" :props="{ key: 'id', label: 'name', }"
            :data="allRoles" :titles="['所有角色', `${user.loginName}的角色`]"
            :format="{ noChecked: '${total}', hasChecked: '${total}', }" :button-texts="['解绑', '绑定']" class="transfer" />
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
const props = defineProps({
    user: {
        type: Object,
        default: {}
    }
})
const emit = defineEmits(['onClose'])

const formLoading = ref(false)
const buttonLoading = ref(false)
//用户角色
const userRoles = ref([])
//所有角色
const allRoles = ref([])

const getUserRoles = async () => {
    try {
        formLoading.value = true
        let res = await get(`/role/GetRolesByUserId/${props.user.id}`)
        userRoles.value = res.data.map(r => r.id)
    } finally {
        formLoading.value = false
    }
}
const getRoles = async () => {
    try {
        formLoading.value = true
        let res = await post(`/role/QueryRoleByPage`, {
            rows: 0,
        })
        allRoles.value = res.data.map(({ id, name }) => ({ id, name }))
    } finally {
        formLoading.value = false
    }
}
const save = async () => {
    try {
        buttonLoading.value = true
        await post('/auth/UserRoleBind', {
            userId: props.user.id,
            roleIds: userRoles.value
        })
        ElMessage.success("角色绑定成功")
        emit("onClose")
    } finally {
        buttonLoading.value = false
    }
}

getRoles()
getUserRoles()
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