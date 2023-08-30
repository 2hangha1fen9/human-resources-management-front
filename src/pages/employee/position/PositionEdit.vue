<template>
    <el-form ref="positionForm" label-width="100px" :model="positionData" :rules="positionRules" v-loading="formLoading">
        <el-form-item prop="positionName" label="岗位名 :" required>
            <el-input placeholder="请输入岗位名" v-model="positionData.positionName" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="status" label="状态 :">
            <el-switch v-model="positionData.status" inline-prompt active-text="启用" :active-value="1" inactive-text="禁用"
                :inactive-value="2" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save(positionForm)" :loading="buttonLoading">提交</el-button>
            <el-button @click="emit('onClose')">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup>
import { ref } from 'vue'
import { get, post, put } from "@/utils/request"
import { ElMessage } from 'element-plus';
const props = defineProps({
    positionId: Number,
    default: 0
})
const emit = defineEmits(['onClose'])

const formLoading = ref(false)
const buttonLoading = ref(false)
const positionForm = ref()
const positionData = ref({})
const positionRules = {
    positionName: [
        { required: true, message: "请输入岗位名", trigger: 'blur' }
    ]
}

const save = async form => {
    try {
        buttonLoading.value = true;
        await form.validate()
        if (props.positionId > 0) {
            await put('/position/editPosition', positionData.value)
        }
        else {
            await post('/position/addPosition', positionData.value)
        }
        ElMessage.success("岗位保存成功")
        emit("onClose")
    } finally {
        buttonLoading.value = false;
    }
}


if (props.positionId > 0) {
    formLoading.value = true;
    get(`/position/GetPositionById/${props.positionId}`).then(res => {
        positionData.value = res.data
    }).finally(() => {
        formLoading.value = false;
    })
}
else {
    positionData.value = {
        id: props.positionId,
        positionName: "",
        status: 1,
    }
}
</script>

<style></style>