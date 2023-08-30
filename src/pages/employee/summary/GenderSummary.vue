<template>
    <el-card class="dashboard-card">
        <template #header>
            <span>性别汇总</span>
        </template>
        <div ref="view" class="echart"></div>
    </el-card>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue'
import { get } from '@/utils/request'
import * as echarts from "echarts"

const view = ref()

//图实例
let chartInstance = null
let chartOption = null
const initChart = async () => {
    //初始化图表
    chartInstance = echarts.init(view.value)
    chartInstance.showLoading()
    chartOption = {
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [
            {
                name: '性别',
                type: 'pie',
                radius: '70%',
                avoidLabelOverlap: false,
                label: {
                    show: true,
                },
                data: []
            }
        ]
    }
    chartInstance.setOption(chartOption)
    let res = await get('/employee/GetGenderSummary')
    chartInstance.setOption({
        series: [
            {
                data: res.data.map((i) => ({ value: i.number, name: i.category })),
            },
        ],
    })
    chartInstance.hideLoading()
}

onMounted(async () => {
    await initChart()
    //响应式图表大小
    window.addEventListener("resize", () => {
        chartInstance.resize()
    })
})

onUnmounted(() => {
    window.removeEventListener("resize", () => {
        chartInstance.resize()
    })
})
</script>

<style scoped>
.echart {
    width: 100%;
    height: 300px;
}
</style>