<template>
  <LoadingSpinner v-if="isLoading" />
  <div v-else-if="error">Failed</div>
  <img
    v-else
    :src="imageOptions.src"
    class="absolute -left-6 w-24 h-24 rounded-full shadow-lg"
  />
</template>

<script setup lang="ts">
import { useImage } from "@vueuse/core";
import { ref } from "vue";
import LoadingSpinner from "./LoadingSpinner.vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
});

const imageOptions = ref({ src: props.src });
const { isLoading, error } = useImage(imageOptions);
</script>
