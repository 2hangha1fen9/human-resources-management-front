<template>
    <el-form ref="roleForm" label-width="100px" :model="roleData" :rules="roleRules" v-loading="formLoading">
        <el-form-item prop="name" label="角色名 :" required>
            <el-input placeholder="请输入角色名" v-model="roleData.name" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="status" label="状态 :">
            <el-switch v-model="roleData.status" inline-prompt active-text="启用" :active-value="1" inactive-text="禁用"
                :inactive-value="2" />
        </el-form-item>
        <el-form-item prop="isDefault" label="是否默认 :">
            <el-switch v-model="roleData.isDefault" inline-prompt active-text="是" :active-value="1" inactive-text="否"
                :inactive-value="2" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save(roleForm)" :loading="buttonLoading">提交</el-button>
            <el-button @click="emit('onClose')">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { get, post, put } from "@/utils/request"
import { ElMessage } from 'element-plus';
const props = defineProps({
    roleId: Number,
    default: 0
})
const emit = defineEmits(['onClose'])

const formLoading = ref(false)
const buttonLoading = ref(false)
const roleForm = ref()
const roleData = ref({})
const roleRules = {
    name: [
        { required: true, message: "请输入角色名", trigger: 'blur' }
    ]
}

const save = async form => {
    try {
        buttonLoading.value = true;
        await form.validate()
        if (props.roleId > 0) {
            await put('/role/editRole', roleData.value)
        }
        else {
            await post('/role/addRole', roleData.value)
        }
        ElMessage.success("角色保存成功")
        emit("onClose")
    } finally {
        buttonLoading.value = false;
    }
}


if (props.roleId > 0) {
    formLoading.value = true;
    get(`/role/GetRoleById/${props.roleId}`).then(res => {
        roleData.value = res.data
    }).finally(() => {
        formLoading.value = false;
    })
}
else {
    roleData.value = {
        id: props.roleId,
        name: "",
        status: 1,
        isDefault: -1
    }
}
</script>

<style></style>