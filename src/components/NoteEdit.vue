<script setup>
import { defineProps } from "vue";
import useBasePath from "@/composables/useBasePath";
import PanelHeader from "@/components/PanelHeader.vue";

defineProps({
  note: Object,
  showBack: Boolean,
});

const { navigateToId } = useBasePath('note');

</script>

<template>
  <div class="p-4 panel">
    <PanelHeader :show-back="showBack">
      <h1>Edit Note</h1>
    </PanelHeader>

    <form v-if="note">
      <label>Content: <input v-model="note.content" /></label><br />

      <button type="submit" @click="navigateToId">Back to details</button>
    </form>
  </div>
</template>
