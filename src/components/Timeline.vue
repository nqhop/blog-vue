<script setup lang="ts">
const periods = ["Today", "This Week", "This Month"];
</script>

<template>
    <nav class="panel">
        <div class="panel-tabs">
            <a v-for="period in periods" :key="period"> {{ period }}</a>
        </div>
    </nav>
</template>
