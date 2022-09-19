<script setup lang="ts">
import { useTitle } from "@vueuse/core";
import { onUnmounted } from "vue";

const title = useTitle();
const currentTitle = "Vue App";

const toggleTitle = () => {
  if (title.value === currentTitle) {
    title.value = "About";
  } else {
    title.value = currentTitle;
  }
};

const interval = setInterval(toggleTitle, 1000);
onUnmounted(async () => {
  clearInterval(interval);
  title.value = currentTitle;
});
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
