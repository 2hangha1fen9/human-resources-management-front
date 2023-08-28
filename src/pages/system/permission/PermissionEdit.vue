<template>
    <el-form ref="permissionForm" label-width="100px" :model="permissionData" :rules="permissionRules"
        v-loading="formLoading">
        <el-form-item prop="name" label="权限名 :" required>
            <el-input placeholder="请输入权限名" v-model="permissionData.name" autocomplete="off"
                :disabled="permissionData.type === 1" />
        </el-form-item>
        <el-form-item v-if="permissionData.type" prop="resource" :label="`${resourceName} :`" required>
            <el-input :placeholder="`请输入${resourceName}`" v-model="permissionData.resource" autocomplete="off"
                :disabled="permissionData.type === 1" />
        </el-form-item>
        <el-form-item prop="type" label="资源类型 :" required>
            <EnumSelect size="small" api="/enum/Get/PermissionType" v-model="permissionData.type" @change="onTypeChange"
                allOptionLable="请选择资源类型" :allOptionValue="null" />
        </el-form-item>
        <el-form-item prop="isPublic" label="公共权限 :">
            <el-switch v-model="permissionData.isPublic" inline-prompt active-text="是" :active-value="1" inactive-text="否"
                :inactive-value="2" />
        </el-form-item>
        <el-form-item prop="status" label="状态 :">
            <el-switch v-model="permissionData.status" inline-prompt active-text="启用" :active-value="1" inactive-text="禁用"
                :inactive-value="2" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save(permissionForm)" :loading="buttonLoading"
                :disabled="permissionData.type === 1">提交</el-button>
            <el-button @click="emit('onClose')">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { get, post, put } from "@/utils/request"
import { ElMessage } from 'element-plus';
import EnumSelect from '@/components/EnumSelect.vue'
const props = defineProps({
    permissionId: Number,
    default: 0
})
const emit = defineEmits(['onClose'])

const formLoading = ref(false)
const buttonLoading = ref(false)
const permissionForm = ref()
const permissionData = ref({})
const resourceName = ref("前端菜单")
const permissionRules = {
    name: [
        { required: true, message: "请输入权限名", trigger: 'blur' }
    ],
    resource: [
        { required: true, message: "请输入资源", trigger: 'blur' }
    ],
    type: [
        { required: true, message: "请选择资源类型", trigger: 'blur' }
    ]
}

const save = async form => {
    try {
        buttonLoading.value = true;
        await form.validate()
        if (props.permissionId > 0) {
            await put('/permission/editPermission', permissionData.value)
        }
        else {
            await post('/permission/addPermission', permissionData.value)
        }
        ElMessage.success("权限保存成功")
        emit("onClose")
    } finally {
        buttonLoading.value = false;
    }
}
const onTypeChange = option => {
    if (option) {
        resourceName.value = option.desction
    }
    else {
        resourceName.value = "前端菜单"
    }
}


if (props.permissionId > 0) {
    formLoading.value = true;
    get(`/permission/GetPermissionById/${props.permissionId}`).then(res => {
        permissionData.value = res.data
    }).finally(() => {
        formLoading.value = false;
    })
}
else {
    permissionData.value = {
        id: props.permissionId,
        name: "",
        resource: "",
        type: 2,
        status: 1,
        isPublic: 2
    }
}
</script>

<style></style>