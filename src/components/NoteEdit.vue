<script setup>
import { defineProps } from "vue";
import useBasePath from "@/composables/useBasePath";

defineProps({
  note: Object,
});

const { navigateToDetails } = useBasePath('note');

</script>

<template>
  <div class="p-4 panel">
    <h1>Edit Note</h1>

    <form v-if="note">
      <label>Content: <input v-model="note.content" /></label><br />

      <button type="submit" @click="navigateToDetails">Back to details</button>
    </form>
  </div>
</template>
