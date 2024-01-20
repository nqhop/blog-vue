import { defineStore } from "pinia";
import { Post, today, thisMonth, thisWeek, TimelinePost } from "../posts";
import { Period } from "../constants";
import { DateTime } from "luxon";
interface PostsState {
  ids: string[];
  all: Map<string, Post>;
  selectedPeriod: Period;
}

// to simulate a bit more of a real world scenario
function delay() {
  return new Promise<void>((res) => setTimeout(res, 1500));
}

export const usePosts = defineStore("posts", {
  state: (): PostsState => ({
    // ids: [today.id, thisWeek.id, thisMonth.id],
    // all: new Map([
    //   [today.id, today],
    //   [thisWeek.id, thisWeek],
    //   [thisMonth.id, thisMonth],
    // ]),
    ids: [],
    all: new Map(),
    selectedPeriod: "Today",
  }),

  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period;
    },
    async fetchPosts() {
      const res = await window.fetch("http://localhost:8000/posts");
      const data = (await res.json()) as Post[];
      await delay();  

      let ids: string[] = [];
      let all = new Map<string, Post>();

      console.log("fetchPosts");
      for (const post of data) {
        console.log(post);
        ids.push(post.id);
        all.set(post.id, post);
      }

      this.ids = ids;
      this.all = all;
    },

    createPost (post: TimelinePost){
      console.log(post)
    }
  },

  // similar to computed properties under the hood
  getters: {
    filteredPosts: (state): TimelinePost[] => {
      return state.ids
        .map((id) => {
          const post = state.all.get(id);
          if (!post) {
            throw Error(`Post with id of ${id} was expected but not found.`);
          }
          return {
            ...post,
            created: DateTime.fromISO(post.created),
          };
        })
        .filter((post) => {
          if (state.selectedPeriod === "Today") {
            return post.created >= DateTime.now().minus({ day: 1 });
          }
          if (state.selectedPeriod === "This Week") {
            return post.created >= DateTime.now().minus({ week: 1 });
          }
          console.log("post: " + post);
          return post;
        });
    },
  },
});
