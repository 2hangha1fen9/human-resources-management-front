<template>
    <div>
        <div class="summary">
            <DepartmentSummary />
            <AgeSummary />
        </div>
        <div class="summary">
            <SenioritySummary />
            <BirthdaySummary />
        </div>
        <div class="summary">
            <EducationSummary />
            <GradeSummary />
        </div>
        <div class="summary">
            <GenderSummary />
            <MaritalSummary />
        </div>
    </div>
</template>

<script setup>
import SenioritySummary from './SenioritySummary.vue';
import GradeSummary from './GradeSummary.vue';
import AgeSummary from './AgeSummary.vue';
import EducationSummary from './EducationSummary.vue'
import DepartmentSummary from './DepartmentSummary.vue';
import GenderSummary from './GenderSummary.vue'
import MaritalSummary from './MaritalSummary.vue';
import BirthdaySummary from './BirthdaySummary.vue'
</script>

<style scoped>
.summary {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.dashboard-card {
    margin: 0px 10px 10px 0px;
    flex-grow: 1;
    width: 50%;
}

.dashboard-card>>>.el-collapse-item__header {
    padding: 10px;
}
</style>