<script setup lang="ts">
import {TimelinePost} from '../posts'
const props = defineProps<{
    post: TimelinePost
}>()
</script>

<template>
  <a class="panel-block is-flex is-flex-direction-column is-align-items-flex-start">
    <a>{{ props.post.title }}</a>
    <div>{{ props.post.created.toFormat("d MMM") }}</div>
  </a>
</template>