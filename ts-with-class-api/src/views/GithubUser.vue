<script lang="ts">
import axios from "axios";
import type { GithubUser, GithubRepo } from "./types";
import { Vue } from "vue-class-component";

class Props {
  username!: string;
}

export default class GithubUsers extends Vue.with(Props) {
  user: GithubUser | null = null;
  repos: GithubRepo[] | null = null;

  async mounted() {
    const http = axios.create({
      baseURL: "https://api.github.com",
      headers: {
        accept: "application/vnd.github.v3+json",
      },
    });

    // https://docs.github.com/en/rest/users/users#get-a-user
    const res = await http.get(`/users/${this.username}`);
    this.user = res.data;

    if (this.user) {
      const reposResponse = await http.get(this.user.repos_url);
      this.repos = reposResponse.data;
    }
  }

  onClickRepo(repo: GithubRepo) {
    window.open(repo.html_url);
  }

  goBack() {
    this.$router.push({ name: "users" });
  }
}
</script>

<template>
  <div>
    <div class="my-12">
      <button
        class="green go-back-hover px-4 py-1 text-sm font-semibold rounded-full border border-emerald-200 hover:text-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
        @click="goBack"
      >
        Go back
      </button>
      <div
        v-if="user"
        class="py-8 px-8 max-w-sm mx-auto bg-zinc-700 rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6"
      >
        <img
          class="block mx-auto h-24 rounded-full sm:mx-0 sm:shrink-0"
          :src="`${user.avatar_url}`"
        />
        <div class="text-center space-y-2 sm:text-left">
          <div class="space-y-0.5">
            <p class="text-lg text-slate-200 font-semibold">
              {{ user.name }}
            </p>
            <p class="text-slate-400 font-medium">{{ user.login }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-for="repo in repos" :key="repo.full_name">
      <div
        class="py-8 px-8 max-w-sm mx-auto bg-white rounded-xl shadow-lg space-y-2 sm:py-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-6 mb-3 cursor-pointer"
        @click="onClickRepo(repo)"
      >
        <div class="text-center space-y-2 sm:text-left">
          <div class="space-y-0.5">
            <p class="text-lg text-black font-semibold">{{ repo.name }}</p>
            <p class="text-slate-500 font-medium">{{ repo.full_name }}</p>
            <p class="text-slate-400 text-xs">{{ repo.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.go-back-hover:hover {
  background-color: hsla(160, 100%, 37%, 1);
}
</style>
