<script setup lang="ts">
import { ref } from "vue";
import useDateFormat from "../composables/useDateFormat";

const dateString = ref("");
const { date, formattedDate } = useDateFormat();

const format = () => {
  if (dateString.value === "") {
    date.value = null;
    return;
  }
  date.value = new Date(dateString.value);
};
</script>

<template>
  <div>
    <input
      v-model="dateString"
      class="mt-12 mb-3 focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 px-4 ring-1 ring-slate-200 shadow-sm"
      type="text"
      placeholder="Type date in Y-m-d format"
      autofocus
      @keyup.enter="format"
    />
    <!-- <button @click="format">Format</button> -->
    <div>{{ formattedDate }}</div>
  </div>
</template>

<style scoped></style>
