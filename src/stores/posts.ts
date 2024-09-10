import { defineStore } from "pinia";
import { DateTime } from "luxon";
import { Post, TimelinePost } from "../posts";
import { Period } from "../constants";

interface PostsState {
    ids: string[];
    all: Map<string, Post>;
    selectedPeriod: Period;
}

// function for assume is delay when getting data from server
function delayFunction() {
    return new Promise((tem) => setTimeout(tem, 2500));
}

export const usePosts = defineStore("posts", {
    state: (): PostsState => ({
        ids: [],
        all: new Map(),
        selectedPeriod: "Today",
    }),

    actions: {
        setSelectedPeriod(period: Period) {
            this.selectedPeriod = period;
        },
        async fetPosts() {
            await delayFunction();
            const res = await fetch("http://localhost:8000/posts");
            const data = (await res.json()) as Post[];

            let ids: string[] = [];
            let all = new Map<string, Post>();

            for (const post of data) {
                ids.push(post.id);
                all.set(post.id, post);
            }
            this.ids = ids;
            this.all = all;
        },

        createPost(post: TimelinePost) {
            console.log(post);
            const body = JSON.stringify({...post, created: post.created.toISO()})
            return window.fetch("http://localhost:8000/posts",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body
            })
        },
    },
    getters: {
        filteredPosts: (state): TimelinePost[] => {
            return state.ids
                .map((id) => {
                    const post = state.all.get(id);
                    if (!post)
                        throw Error(
                            `Post with id of ${id} was exprected but not found`
                        );
                    return {
                        ...post,
                        created: DateTime.fromISO(post.created),
                    };
                })
                .filter((post) => {
                    switch (state.selectedPeriod) {
                        case "Today":
                            return (
                                post.created >= DateTime.now().minus({ day: 1 })
                            );
                        case "This Week":
                            return (
                                post.created >=
                                DateTime.now().minus({ week: 1 })
                            );
                        default:
                            return true;
                    }
                });
        },
    },
});
