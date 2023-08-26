<template>
    <svg :class="svgClass" aria-hidden="true" v-on="$attrs" :style="{ color: props.color }">
        <use :xlink:href="iconName" />
    </svg>
</template>
<script setup>
import { computed } from 'vue'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    color: {
        type: String,
        default: ''
    }
}) // 获取props defineProps<{ msg: string }>()
const iconName = computed(() => `#icon-${props.name}`)
const svgClass = computed(() => {
    if (props.className) {
        return `svg-icon icon-${props.name}`
    } else {
        return 'svg-icon'
    }
})
</script>
  
<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>