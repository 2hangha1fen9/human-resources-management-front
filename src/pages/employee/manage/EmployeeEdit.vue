<template>
    <el-form ref="employeeForm" label-width="100px" :model="employeeData" :rules="employeeRules" v-loading="formLoading">
        <el-form-item prop="workNum" label="工号 :" required>
            <el-input placeholder="请输入工号" v-model="employeeData.workNum" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="name" label="姓名 :" required>
            <el-input placeholder="请输入姓名" v-model="employeeData.name" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="workStatus" label="工作状态 :" required>
            <EnumSelect api="/enum/Get/WorkStatus" v-model="employeeData.workStatus" :allOptionValue="null"
                allOptionLable="请选择" />
        </el-form-item>
        <el-form-item prop="idCard" label="身份证号 :" required>
            <el-input placeholder="请输入身份证号" v-model="employeeData.idCard" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="phone" label="手机号 :" required>
            <el-input placeholder="请输入手机号" v-model="employeeData.phone" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="hireDate" label="入职日期 :" required>
            <el-date-picker v-model="employeeData.hireDate" type="date" placeholder="出生日期" format="YYYY-MM-DD"
                value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item prop="positionId" label="岗位 :" required>
            <EnumSelect api="/position/QueryPositionByPage" v-model="employeeData.positionId" keys="id"
                values="positionName" :request="post" :params="{ rows: 0 }" :allOptionValue="null" allOptionLable="请选择" />
        </el-form-item>
        <el-form-item prop="departmentId" label="部门 :" required>
            <EnumSelect api="/department/QueryDepartmentByPage" v-model="employeeData.departmentId" keys="id"
                values="departmentName" :request="post" :params="{ rows: 0 }" :allOptionValue="null" allOptionLable="请选择" />
        </el-form-item>
        <el-form-item prop="positionLevel" label="职级 :" required>
            <EnumSelect api="/enum/Get/PositionLevel" v-model="employeeData.positionLevel" :allOptionValue="null"
                allOptionLable="请选择" />
        </el-form-item>
        <el-form-item prop="email" label="邮箱 :">
            <el-input placeholder="请输入邮箱" v-model="employeeData.email" autocomplete="off" />
        </el-form-item>
        <el-form-item prop="gender" label="性别 :">
            <EnumSelect size="default" api="/enum/Get/Gender" v-model="employeeData.gender" :allOptionValue="null"
                allOptionLable="请选择" />
        </el-form-item>
        <el-form-item prop="maritalStatus" label="婚姻状态 :">
            <EnumSelect size="default" api="/enum/Get/MaritalStatus" v-model="employeeData.maritalStatus"
                :allOptionValue="null" allOptionLable="请选择" />
        </el-form-item>
        <el-form-item prop="birthDay" label="出生日期 :">
            <el-date-picker v-model="employeeData.birthDay" type="date" placeholder="出生日期" format="YYYY-MM-DD"
                value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item prop="native" label="籍贯 :">
            <el-input placeholder="请输入籍贯" v-model="employeeData.native" autocomplete="off" />
        </el-form-item>

        <el-form-item prop="academicDegree" label="学历 :">
            <EnumSelect size="default" api="/enum/Get/AcademicDegree" v-model="employeeData.academicDegree"
                :allOptionValue="null" allOptionLable="请选择" />
        </el-form-item>

        <el-form-item prop="status" label="状态 :">
            <el-switch v-model="employeeData.status" inline-prompt active-text="启用" :active-value="1" inactive-text="禁用"
                :inactive-value="2" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="save(employeeForm)" :loading="buttonLoading">提交</el-button>
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
    employeeId: Number,
    default: 0
})
const emit = defineEmits(['onClose'])

const formLoading = ref(false)
const buttonLoading = ref(false)
const employeeForm = ref()
const employeeData = ref({})
const employeeRules = {
    workNum: [
        { required: true, message: "请输入工号", trigger: 'blur' }
    ],
    workStatus: [
        { required: true, message: "请输选择工作状态", trigger: 'blur' }
    ],
    name: [
        { required: true, message: "请输入姓名", trigger: 'blur' }
    ],
    idCard: [
        { required: true, message: "请输入身份证号", trigger: 'blur' }
    ],
    phone: [
        { required: true, message: "请输入手机号", trigger: 'blur' }
    ],
    hireDate: [
        { required: true, message: "请输入职日期", trigger: 'blur' }
    ],
    positionId: [
        { required: true, message: "请选择岗位", trigger: 'blur' }
    ],
    departmentId: [
        { required: true, message: "请选择部门", trigger: 'blur' }
    ],
    positionLevel: [
        { required: true, message: "请选择职级", trigger: 'blur' }
    ]
}

const save = async form => {
    try {
        buttonLoading.value = true;
        await form.validate()
        if (props.employeeId > 0) {
            await put('/employee/EditEmployee', employeeData.value)
        }
        else {
            await post('/employee/AddEmploysee', employeeData.value)
        }
        ElMessage.success("员工保存成功")
        emit("onClose")
    } finally {
        buttonLoading.value = false;
    }
}


if (props.employeeId > 0) {
    formLoading.value = true;
    get(`/employee/GetEmployeeById/${props.employeeId}`).then(res => {
        employeeData.value = res.data
    }).finally(() => {
        formLoading.value = false;
    })
}
else {
    employeeData.value = {
        id: props.employeeId,
        workNum: null,
        workStatus: null,
        name: null,
        gender: null,
        maritalStatus: null,
        birthDay: null,
        idCard: null,
        native: null,
        phone: null,
        email: null,
        academicDegree: null,
        hireDate: null,
        positionId: null,
        departmentId: null,
        positionLevel: null,
        status: 1
    }
}
</script>

<style></style>