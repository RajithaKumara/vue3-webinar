<script setup lang="ts">
import { useTitle,useDraggable } from "@vueuse/core";
import { onBeforeUnmount,ref } from "vue";

const el = ref<HTMLElement | null>(null)
const { x, y, style } = useDraggable(el)

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
onBeforeUnmount(async () => {
  clearInterval(interval);
  title.value = currentTitle;
});
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
  <div ref="el" :style="style" style="position: fixed" class="cursor-pointer p-6 bg-emerald-500 rounded-full select-none">
    👋 Drag me! I am at {{x}}, {{y}}
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
