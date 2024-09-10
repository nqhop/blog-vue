<script lang="ts" setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import { TimelinePost } from "../posts";
import { marked } from "marked";
const props = defineProps<{
    post: TimelinePost;
}>();

const title = ref(props.post.title);
const content = ref(props.post.markdown);
const html = ref("");
const contenteditable = ref<HTMLDivElement>();

watchEffect(() => {
    marked.parse(content.value, (err, parseResult) => {
        html.value = parseResult;
    });
});
// watch(
//     content,
//     (newContent) => {
//         marked.parse(newContent, (err, parseResult) => {
//             html.value = parseResult;
//         });
//     },
//     {
//         immediate: true,
//     }
// );

function handleInput() {
    if (!contenteditable.value) {
        throw Error("ContentEdiable DOM node was not found");
    }
    content.value = contenteditable.value.innerText;
}
onMounted(() => {
    // console.log(contenteditable.value?.innerText);
});
</script>

<template>
    <div class="columns">
        <div class="column">
            <div class="field">
                <div class="label">Post title</div>
                <input type="text" class="input" v-model="title" />
            </div>

            <div class="columns">
                <div class="column">
                    <div
                        contenteditable
                        ref="contenteditable"
                        @input="handleInput"
                    ></div>
                </div>
                <div class="column">
                    <div v-html="html"></div>
                </div>
            </div>
        </div>
    </div>
</template>
