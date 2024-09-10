<script lang="ts" setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import { TimelinePost } from "../posts";
import { marked } from "marked";
import highlightjs from "highlight.js";
import { debounce } from "lodash";

const props = defineProps<{
    post: TimelinePost;
}>();

const title = ref(props.post.title);
const content = ref(props.post.markdown);
const html = ref("");
const contenteditable = ref<HTMLDivElement>();

// watchEffect(() => {
//     marked.parse(
//         content.value,
//         {
//             gfm: true,
//             breaks: true,
//             highlight: (code) => {
//                 return highlightjs.highlightAuto(code).value;
//             },
//         },
//         (err, parseResult) => {
//             html.value = parseResult;
//         }
//     );
// });

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
watch(
    content,
    debounce((newContent) => {
        parseHtml(newContent);
    }, 250),
    {
        immediate: true,
    }
);

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
