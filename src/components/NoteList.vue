<script setup>
import { defineProps, watch } from "vue";
import { useFakeContactsStore } from "@/stores/fakeContactsStore";
import { useRoute, useRouter } from "vue-router";
import useBasePath from "../composables/useBasePath";
import { useAsyncState } from "@vueuse/core";
import useShowOrHide from "../composables/useShowOrHide";

const { isWideEnough, isCurrentRoute } = useShowOrHide(1470, /^\/contacts\/[^/]+\/notes$/);
const props = defineProps({
  contact: Object,
});

const route = useRoute();
const router = useRouter();

const { basePath: contactBasePath } = useBasePath('contact');

const { basePath, isListRoute, navigateToId } = useBasePath('note', {
    doProvide: true,
    basePath: `${contactBasePath}/${route.params.contactId}/notes`
});
const { addNote, getNotesByContactId } = useFakeContactsStore();

const {state: notes, isLoading, execute: loadNotes} = useAsyncState(async ()=>{
    return getNotesByContactId(props.contact.id);
}, [], {immediate: false, resetOnExecute: false})

watch(()=>props.contact.id, (newVal)=> {
    console.log('contactId watcher fired', newVal);
    loadNotes();
}, {immediate: true});

async function addContactNote(note) {
  const newNote = await addNote(
      route.params.contactId,
      note.content,
  );

  console.log('newNote', newNote);
  await loadNotes();

  navigateToId
}

</script>

<template>
  <div class="main-wrapper flex gap-2">
    <div v-show="isWideEnough || isCurrentRoute" class="panel p-4">
      <h1>Notes List</h1>

      <div>base path: {{ basePath }}</div>


      <ul>
        <li v-for="note in notes" :key="note.id">
          <RouterLink :to="`${basePath}/${note.id}`">
            {{ note.content }}
          </RouterLink>
        </li>
      </ul>

      <div v-if="isLoading">Loading...</div>

      <div v-show="isWideEnough || !isCurrentRoute" class="m-4">
        <RouterLink :to="`${basePath}/add`">Go to add note</RouterLink>
      </div>
    </div>

    <router-view @add="addContactNote" />

  </div>
</template>

<style scoped>
.main-wrapper {
  height: 100dvh;
}
</style>
