import { createRouter, createMemoryHistory } from "vue-router";
import Home from "./views/Home.vue";

export const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/", component: Home }],
});
