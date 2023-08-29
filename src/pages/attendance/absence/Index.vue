<template>
    <div>
        <div class="search-panel">
            <el-form :inline="true" class="demo-form-inline">
                <el-form-item label="登录名 :">
                    <el-input size="small" placeholder="关键字" />
                </el-form-item>
                <el-form-item label="状态 :">
                    <EnumSelect size="small"/>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="primary">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button size="small" type="success">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup>

</script>

<style></style>