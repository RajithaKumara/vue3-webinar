<script setup lang="ts">
import { inject } from "vue";
import type { DateFormatOptions } from "../composables/useDateFormat";

const dateFormatOptions = inject<DateFormatOptions>("dateFormatOptions");

interface DateTimeFormatOptions extends Intl.DateTimeFormatOptions {
  title: string;
}

const options: DateTimeFormatOptions[] = [
  {
    title: "Thursday, September 22, 2022",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  },
  {
    title: "Thu, Sep 22, 2022",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  {
    title: "Sep 22, 2022",
    year: "numeric",
    month: "short",
    day: "numeric",
  },
  {
    title: "9/22/2022",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  },
];

const selectOption = (option: DateTimeFormatOptions) => {
  dateFormatOptions?.updateDateFormatOptions(option);
};
</script>

<template>
  <div class="bg-white rounded divide-y divide-gray-100 shadow my-6">
    <ul class="py-1 text-sm text-gray-700" aria-labelledby="dropdownDefault">
      <li v-for="option in options" :key="option.title" class="cursor-pointer">
        <a
          @click="selectOption(option)"
          class="block py-2 px-4 hover:bg-gray-100"
        >
          {{ option.title }}
        </a>
      </li>
    </ul>
  </div>
</template>
