<template>
    <el-card class="dashboard-card">
        <template #header>
            <span>工龄汇总</span>
        </template>
        <div ref="view" class="echart"></div>
    </el-card>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { get } from '@/utils/request'
import * as echarts from "echarts"

const view = ref()
const data = ref([])

//图实例
let chartInstance = null
let chartOption = null
const initChart = () => {
    //初始化图表
    chartInstance = echarts.init(view.value)
    chartInstance.showLoading()
    chartOption = {
        tooltip: {
            //提示框触发位置，数据轴
            trigger: "axis",
        },
        toolbox: {
            //显示工具栏
            show: true,
            feature: {
                dataView: { readOnly: false },
                magicType: { type: ["line", "bar"] }, //切换视图
            },
        },
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
        dataZoom: [
            {
                type: "inside",
            },
        ],
        series: [
            //数据值
            {
                name: "人数",
                type: "line", //折线
                data: [], //数据
                areaStyle: {},
                markPoint: {
                    //显示极值点
                    data: [
                        { type: "max", name: "Max" },
                        { type: "min", name: "Min" },
                    ],
                },
                markLine: {
                    //显示平均线
                    data: [{ type: "average", name: "Avg" }],
                },
            },
        ],
    }
    chartInstance.setOption(chartOption)
}
const search = async () => {
    let res = await get('/employee/GetSenioritySummary')

}

</script>

<style scoped>
.echart {
    width: 100%;
    height: 300px;
}
</style>