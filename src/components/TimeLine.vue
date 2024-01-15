<script setup lang="ts">
import { ref } from "vue";
import { DateTime } from "luxon";
import { Post, thisWeek, thisMonth, today } from "../posts";

const periods = ["Today", "This Week", "This Month"] as const;
type Period = (typeof periods)[number];

const selectedPeriod = ref<Period>("Today");
function selectPeriod(period: Period) {
  console.log(period);
  selectedPeriod.value = period;
}

const posts = [today, thisWeek, thisMonth].map((post) => {
  return {
    ...post,
    created: DateTime.fromISO(post.created)
  };
});
</script>

<template>
  {{ selectedPeriod }}
  <nav class="is-primary panel">
    <span class="panel-tabs">
      <a
        v-for="period of periods"
        :key="period"
        @click="selectPeriod(period)"
        :class="{ 'is-active': period === selectedPeriod }"
        >{{ period }}</a
      >
    </span>
  </nav>

  <a v-for="post of posts" :key="post.id" class="panel-block">
    <a>{{ post.title }}</a>
    <div>{{ post.created.toFormat("d MMM") }}</div>
  </a>
</template>
