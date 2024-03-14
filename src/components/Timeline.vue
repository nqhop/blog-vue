<script setup lang="ts">
import { usePosts } from "../stores/posts";
import TimelineItem from "./TimelineItem.vue";
import { periods } from "../constants";

const postStore = usePosts();
await postStore.fetPosts();
</script>

<template>
    <nav class="panel">
        <div class="panel-tabs">
            <a
                v-for="period in periods"
                :key="period"
                v-on:click="postStore.setSelectedPeriod(period)"
                :class="{ 'is-active': period === postStore.selectedPeriod }"
            >
                {{ period }}</a
            >
        </div>
        <TimelineItem
            v-for="post in postStore.filteredPosts"
            :key="post.id"
            :post="post"
        />
    </nav>
</template>
