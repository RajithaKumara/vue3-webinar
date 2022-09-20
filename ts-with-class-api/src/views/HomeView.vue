<template>
  <main>
    <TheWelcome />
  </main>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TheWelcome from "@/components/TheWelcome.vue";

@Options({
  components: {
    TheWelcome,
  },
})
export default class HomeView extends Vue {}
</script>
