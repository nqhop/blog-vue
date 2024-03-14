import { createRouter, createMemoryHistory } from "vue-router";
import Home from "./views/Home.vue";
import NewPost from "./views/NewPost.vue";

export const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        { path: "/", component: Home },
        { path: "/posts/new", component: NewPost },
    ],
});
