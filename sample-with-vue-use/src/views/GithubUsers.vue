<script setup lang="ts">
import { useRouter } from "vue-router";
import type { Ref } from "vue";
import { ref } from "vue";
import axios from "axios";
import type { GithubUser } from "./types";
import GithubAvatar from "../components/GithubAvatar.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";

const name: Ref<string> = ref("");
const users: Ref<GithubUser[]> = ref([]);
const http = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    accept: "application/vnd.github.v3+json",
  },
});
const router = useRouter();
const loading = ref(false);

const onClick = async () => {
  users.value = [];
  loading.value = true;
  // https://docs.github.com/en/rest/users/users#list-users
  const res = await http.get("/search/users", {
    params: { per_page: 100, q: name.value },
  });
  loading.value = false;
  users.value = res.data.items;
};

const onClickProfile = (user: GithubUser) => {
  window.open(user.html_url);
};

const onClickMore = (username: string) => {
  router.push({ name: "user", params: { username } });
};
</script>

<template>
  <div class="p-8">
    <input
      v-model="name"
      class="mt-12 mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 px-4 ring-1 ring-slate-200 shadow-sm"
      type="text"
      aria-label="Filter projects"
      placeholder="Search GitHub Users..."
      autofocus
    />
    <button
      class="mb-12 green go-back-hover px-4 py-1 text-sm font-semibold rounded-full border border-emerald-200 hover:text-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
      @click="onClick"
      v-if="!loading"
    >
      Search
    </button>
    <LoadingSpinner v-else />

    <div v-for="user in users" :key="user.id">
      <div class="mt-4 -mb-3 cursor-pointer" @click="onClickProfile(user)">
        <div
          class="not-prose relative rounded-xl overflow-hidden bg-slate-800/25"
        >
          <div
            style="background-position: 10px 10px"
            class="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))]"
          ></div>
          <div class="relative rounded-xl overflow-auto p-8 hover:bg-slate-400">
            <div
              class="overflow-visible relative max-w-sm mx-auto shadow-lg ring-1 ring-black/5 rounded-xl flex items-center gap-6 bg-slate-800 highlight-white/5"
            >
              <GithubAvatar :src="user.avatar_url" />
              <div class="flex flex-col py-5 pl-24">
                <strong class="text-sm font-medium text-slate-200">
                  {{ user.login }}
                </strong>
                <div class="mt-2">
                  <span
                    class="rounded-full text-slate-400 px-2 py-1 bg-slate-700 text-sm font-medium"
                  >
                    {{ user.type }}
                  </span>
                </div>
                <button
                  @click.stop="onClickMore(user.login)"
                  class="green go-back-hover mt-2 px-4 py-1 text-sm font-semibold rounded-full border border-emerald-200 hover:text-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:ring-offset-2"
                >
                  More...
                </button>
              </div>
            </div>
          </div>
          <div
            class="absolute inset-0 pointer-events-none border border-black/5 rounded-xl border-white/5"
          ></div>
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
