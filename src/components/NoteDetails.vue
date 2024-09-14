<script setup>
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAsyncState } from "@vueuse/core";
import useBasePath from "@/composables/useBasePath";
import {useFakeContactsStore} from "@/stores/fakeContactsStore";

const route = useRoute();
const router = useRouter();

const { getNoteById } = useFakeContactsStore();

const { navigateToEdit } = useBasePath('note');

const { state: note, isLoading, error, execute: fetchNote } = useAsyncState(async ()=> {
    return await getNoteById(route.params.noteId);
}, {}, {immediate: false})

watch(()=>route.params.noteId, (newVal)=> {
    console.log('noteId watcher fired', newVal);
    fetchNote();
}, {immediate: true});

</script>

<template>
  <div class="flex gap-2">
    <div class="p-4 panel">
      <h1>Note Details</h1>

      <div v-if="isLoading">Loading...</div>

      <div v-if="error">Can't load that note</div>

      <template v-else>
        <h3>{{ note.content }}</h3>

        <button @click="navigateToEdit()">Edit</button>
      </template>
    </div>

    <RouterView :note="note" />

  </div>
</template>
