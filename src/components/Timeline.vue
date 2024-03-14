<script setup lang="ts">
import { ref, computed } from "vue";

import { TimelinePost, today, thisMonth, thisWeek } from "../posts";
import { usePosts } from "../stores/posts";
import TimelineItem from "./TimelineItem.vue";
import { DateTime } from "luxon";

const postStore = usePosts();

const periods = ["Today", "This Week", "This Month"] as const;
type Period = (typeof periods)[number];

const selectedPeriod = ref<Period>(periods[0]);

const posts = computed<TimelinePost[]>(() => {
    return postStore.ids
        .map((id) => {
            const post = postStore.all.get(id);
            if (!post)
                throw Error(
                    `Post with id of ${id} was exprected but not found`
                );
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
        <TimelineItem v-for="post in posts" :key="post.id" :post="post" />
    </nav>
</template>
