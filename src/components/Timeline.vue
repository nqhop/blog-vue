<script setup lang="ts">
import { ref } from "vue";

const periods = ["Today", "This Week", "This Month"] as const;
type Period = (typeof periods)[number];

const selectedPeriod = ref<Period>(periods[0]);

function selectPeriod(period: Period) {
    selectedPeriod.value = period;
}
</script>

<template>
    <nav class="panel">
        {{ selectedPeriod }}
        <div class="panel-tabs">
            <a
                v-for="period in periods"
                :key="period"
                v-on:click="selectPeriod(period)"
                :class="{ 'is-active': period === selectedPeriod }"
            >
                {{ period }}</a
            >
        </div>
    </nav>
</template>
