<script setup>
import { ref } from "vue";
import useBasePath from "@/composables/useBasePath";

const emit = defineEmits(['add']);

const note = ref({ content: "Some new note is being added at " + new Date().toISOString() });
const { basePath } = useBasePath('note');

async function add() {
  emit('add', note.value);
}

</script>

<template>
  <div class="panel">
    <h1>Add Note</h1>

    <div class="flex flex-col gap-2">
      <div>Content:</div>

      <textarea v-model="note.content"/>

      <button @click="add">Add Note</button>
    </div>
  </div>
</template>
