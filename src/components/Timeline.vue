<script setup lang="ts">
import { ref } from "vue";

import { Post, today, thisMonth, thisWeek } from "../posts";
import { DateTime } from "luxon";

const periods = ["Today", "This Week", "This Month"] as const;
type Period = (typeof periods)[number];

const selectedPeriod = ref<Period>(periods[0]);

const posts = [today, thisWeek, thisMonth].map((post) => {
    return {
        ...post,
        created: DateTime.fromISO(post.created),
    };
});

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

        <a v-for="post of posts" :key="post.id" class="panel-block">
            <a> {{ post.title }} </a>
            <div>{{ post.created.toFormat("d MMM") }}</div>
        </a>
    </nav>
</template>
