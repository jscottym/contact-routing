<script setup>
import { defineProps } from "vue";
import useBasePath from "@/composables/useBasePath";
import PanelHeader from "@/components/PanelHeader.vue";

defineProps({
  note: Object,
  showBack: Boolean,
});

const emit = defineEmits(['save']);

const { navigateToId } = useBasePath('note');

</script>

<template>
  <div class="p-4 panel">
    <PanelHeader :show-back="showBack">
      <h1>Edit Note</h1>
    </PanelHeader>

    <label>Content: <input v-model="note.content" /></label><br />

    <button @click="emit('save')">Save</button>

    <button @click="navigateToId">Back to details</button>
  </div>
</template>
