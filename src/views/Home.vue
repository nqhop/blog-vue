<script lang="ts" setup>
import TimeLine from "../components/TimeLine.vue";
</script>

<template>
  <router-view />
  <Suspense>
    <template #default>
      <TimeLine />
    </template>
    <template #fallback>
      <progress class="progress is-primary is-small" />
    </template>
  </Suspense>
</template>
