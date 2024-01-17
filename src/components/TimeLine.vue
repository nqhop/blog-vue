<script setup lang="ts">
import { ref, computed } from "vue";
import { DateTime } from "luxon";
import { TimelinePost ,thisWeek, thisMonth, today } from "../posts";
import TimelineItem from "./TimelineItem.vue";

const periods = ["Today", "This Week", "This Month"] as const;
type Period = (typeof periods)[number];

const selectedPeriod = ref<Period>("Today");
function selectPeriod(period: Period) {
  console.log(period);
  selectedPeriod.value = period;
}

const posts = computed<TimelinePost[]>(() => {
  return [today, thisWeek, thisMonth]
    .map((post) => {
      return {
        ...post,
        created: DateTime.fromISO(post.created),
      };
    })
    .filter((post) => {
      if (selectedPeriod.value === "Today") {
        return post.created >= DateTime.now().minus({ day: 1 });
      }
      if (selectedPeriod.value === "This Week") {
        return post.created >= DateTime.now().minus({ week: 1 });
      }
      console.log("post: " + post);
      return post;
    });
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

    <TimelineItem v-for="post of posts" :key="post.id" :post="post" />
  </nav>
</template>
