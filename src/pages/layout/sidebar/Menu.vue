<template>
    <!-- 如果路由有子级 -->
    <el-sub-menu v-if="item.children && item.children.length && !item.meta.hidden" :index="item.path">
        <template #title>
            <el-icon>
                <icon v-if="item.meta.icon" :name="item.meta.icon" />
            </el-icon>
            <span>{{ item.name }} </span>
        </template>
        <!-- 遍历子级 -->
        <Menu v-for="chlid in item.children" :item="chlid" :key="chlid.path"></Menu>
    </el-sub-menu>
    <!-- 路由没有子级 -->
    <el-menu-item v-else-if="!item.meta.hidden" :index="item.path">
        <template #title>
            <el-icon>
                <icon v-if="item.meta.icon" :name="item.meta.icon" />
            </el-icon>
            <span>{{ item.name }}</span>
        </template>
    </el-menu-item>
</template>

<script setup>
defineProps({
    item: {
        type: Object,
        default: {}
    }
})
</script>