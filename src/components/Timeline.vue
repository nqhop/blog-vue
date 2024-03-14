<script setup lang="ts">
import { ref, computed } from "vue";

import { Post, today, thisMonth, thisWeek } from "../posts";
import { DateTime } from "luxon";

const periods = ["Today", "This Week", "This Month"] as const;
type Period = (typeof periods)[number];

const selectedPeriod = ref<Period>(periods[0]);

const posts = computed(() => {
    return [today, thisWeek, thisMonth]
        .map((post) => {
            return {
                ...post,
                created: DateTime.fromISO(post.created),
            };
        })
        .filter((post) => {
            switch (selectedPeriod.value) {
                case "Today":
                    return post.created >= DateTime.now().minus({ day: 1 });
                case "This Week":
                    return post.created >= DateTime.now().minus({ week: 1 });
                default:
                    return true;
            }
        });
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
