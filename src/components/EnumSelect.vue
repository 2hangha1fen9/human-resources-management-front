<template>
    <el-select v-model="selected" :placeholder="props.placeholder" :size="props.size">
        <el-option :value="props.allOptionValue" :label="props.allOptionLable">{{ props.allOptionLable }}</el-option>
        <el-option v-for="item in options" :key="item[props.keys]" :label="item[props.values]" :value="item[props.keys]" />
    </el-select>
</template>

<script setup>
import { ref, watch } from 'vue'
import { get } from "@/utils/request"
const props = defineProps({
    placeholder: {
        type: String,
        default: "请选择"
    },
    size: {
        type: String,
        default: "default"
    },
    keys: {
        type: String,
        default: "enumValue"
    },
    values: {
        type: String,
        default: "desction"
    },
    allOptionShow: {
        type: Boolean,
        default: true
    },
    allOptionLable: {
        type: String,
        default: "全部"
    },
    allOptionValue: {
        type: Number,
        default: -1
    },
    api: {
        type: String,
        default: ""
    },
    request: {
        type: Function,
        default: get
    },
    params: {
        type: Object,
        default: undefined
    }
})
const emit = defineEmits(["change"])

const options = ref([])
const selected = ref({})

const search = async () => {
    let res = await props.request(props.api, props.params)
    options.value = res.data
}

watch(() => selected, (newVal, oldVal) => {
    let option = options.find(i => i[props.keys] == newVal)
    emit("change", option)
})
search()
</script>

<style></style>