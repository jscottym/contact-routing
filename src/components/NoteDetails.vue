<script setup>
import {watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useAsyncState} from "@vueuse/core";
import useBasePath from "@/composables/useBasePath";
import {useFakeContactsStore} from "@/stores/fakeContactsStore";

const route = useRoute();
const router = useRouter();

const {getNoteById} = useFakeContactsStore();

const {navigateToEdit} = useBasePath('note');

const {state: note, isLoading, error, execute: fetchNote} = useAsyncState(async () => {
    return await getNoteById(route.params.noteId);
}, {}, {immediate: false});

watch(() => route.params.noteId, (newVal) => {
    console.log('noteId watcher fired', newVal);
    fetchNote();
}, {immediate: true});
</script>

<template>
  <div class="flex gap-2">


    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <component :is="Component" :note="note"/>
      </template>

      <template v-else>
        <div class="p-4 panel">
          <div v-if="isLoading">Loading...</div>

          <div v-if="error">Can't load that note</div>

          <h1>Note Details</h1>

          <div>{{ note.id }}</div>
          <div>{{ note.content }}</div>

          <button @click="navigateToEdit">Edit</button>
        </div>
      </template>
    </router-view>
  </div>
</template>
