<template>
    <el-card class="dashboard-card">
        <template #header>
            <span>工龄汇总</span>
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
    chartInstance = echarts.init(view.value, null, {
        renderer: 'svg'
    })
    chartInstance.showLoading()
    chartOption = {
        tooltip: {
            //提示框触发位置，数据轴
            trigger: "axis",
        },
        dataZoom: [
            {
                type: "inside",
            },
        ],
        xAxis: {
            //x轴数据
            name: "工龄",
            type: "category",
            boundaryGap: true,
            data: [],
        },
        yAxis: {
            //y轴数据
            name: "人数",
            type: "value",
            minInterval: 1,
        },
        series: [
            //数据值
            {
                name: "人数",
                type: "bar",
                data: [], //数据
            },
        ],
    }
    chartInstance.setOption(chartOption)
    let res = await get('/employee/GetSenioritySummary')
    chartInstance.setOption({
        xAxis: {
            data: res.data.map((i) => i.category),
        },
        series: [
            {
                data: res.data.map((i) => i.number),
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