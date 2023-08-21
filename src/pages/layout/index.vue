<template>
    <div class="common-layout">
        <el-container>
            <!-- 侧边栏 -->
            <SideBar class="side-m"></SideBar>
            <!-- 主窗口 -->
            <Main class="main-m"></Main>
        </el-container>
    </div>
</template>
<script setup>
import Main from "./main/Main.vue"
import SideBar from "./sideBar/SideBar.vue"
</script>
