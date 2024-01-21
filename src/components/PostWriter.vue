<script lang="ts" setup>
import { ref, onMounted, watch, watchEffect, computed } from "vue";
import { TimelinePost } from "../posts";
import { marked } from "marked";
import highlightjs from "highlight.js";
import debounce from "lodash/debounce";
import { usePosts } from "../stores/posts";
import { useRouter } from "vue-router";

const props = defineProps<{
  post: TimelinePost;
}>();

const title = ref(props.post.title);
const content = ref(props.post.markdown);
const html = ref("");
const contentEditalbe = ref<HTMLDivElement>();

const posts = usePosts();
const router = useRouter();

function parseHtml(markdown: string) {
  marked.parse(
    markdown,
    {
      gfm: true,
      breaks: true,
      highlight: (code) => {
        return highlightjs.highlightAuto(code).value;
      },
    },
    (err, parseResult) => {
      html.value = parseResult;
    }
  );
}
// watchEffect(() => {
//   parseHtml(content.value)
// })

// watch(content, debounce((newValues) => {
// }, 2500), {
//   immediate: true
// })

watch(content, debounce(parseHtml, 250), {
  immediate: true,
});

onMounted(() => {
  if (!contentEditalbe.value) {
    throw Error("ContenEditable DOM node was not found");
  }
  contentEditalbe.value.innerText = content.value;
});
function handleInput() {
  if (!contentEditalbe.value) {
    throw Error("ContenEditable DOM node was not found");
  }
  content.value = contentEditalbe.value.innerText;
}

async function handleClick() {
  const newPost: TimelinePost = {
    ...props.post,
    title: title.value,
    markdown: content.value,
    html: html.value,
  };
  await posts.createPost(newPost);
  // router.push("/")
}
</script>
<template>
  <div class="columns">
    <div class="column">
      <div class="field">
        <div class="label">Post title</div>
        <input type="text" class="input" v-model="title" />
      </div>
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <div contenteditable ref="contentEditalbe" @input="handleInput" />
    </div>
    <div class="column">
      <div v-html="html" />
    </div>
  </div>

  <div class="columns">
    <div class="column">
      <button class="button is-primary is-pulled-right" @click="handleClick">
        Save Post
      </button>
    </div>
  </div>
</template>