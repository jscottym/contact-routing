<script setup>
import { defineProps, watch } from "vue";
import { useFakeContactsStore } from "@/stores/fakeContactsStore";
import { useRoute, useRouter } from "vue-router";
import useBasePath from "../composables/useBasePath";
import { useAsyncState } from "@vueuse/core";
import useShowOrHide from "../composables/useShowOrHide";
import PanelHeader from "@/components/PanelHeader.vue";

const { isWideEnough, isCurrentPanelComponent } = useShowOrHide(750*2);
const props = defineProps({
  contact: Object,
});

const route = useRoute();
const router = useRouter();

const { basePath: contactBasePath } = useBasePath('contact');

const { basePath, navigateToId, navigateToList } = useBasePath('note', {
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

  if(isWideEnough.value) {
      console.log('navigating to note', newNote.id);
      navigateToId({id: newNote.id});
  } else {
      console.log('navigating to list');
      navigateToList();
  }
}

</script>

<template>
  <div class="main-wrapper flex gap-2">
    <div v-show="isWideEnough.value || isCurrentPanelComponent" class="panel">
      <div class="flex flex-col gap-2">
        <PanelHeader :show-back="!isWideEnough.value">
          <h1>Notes List</h1>

          <pre>{{ { isWideEnough } }}</pre>
        </PanelHeader>

        <ul>
          <li v-for="note in notes" :key="note.id">
            <RouterLink :to="`${basePath}/${note.id}`">
              {{ note.content }}
            </RouterLink>
          </li>
        </ul>

        <div v-if="isLoading">Loading...</div>

        <RouterLink :to="`${basePath}/add`">Go to add note</RouterLink>
      </div>
    </div>

    <div v-show="isWideEnough.value || !isCurrentPanelComponent">
      <router-view @add="addContactNote" :show-back="!isWideEnough.value" />
    </div>

  </div>
</template>

<style scoped>
.main-wrapper {
  height: 100dvh;
}
</style>
