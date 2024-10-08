<script setup>
import { defineProps, watch } from "vue";
import { useFakeContactsStore } from "@/stores/fakeContactsStore";
import { useRoute, useRouter } from "vue-router";
import useBasePath from "../composables/useBasePath";
import { useAsyncState } from "@vueuse/core";
import useShowOrHide from "../composables/useShowOrHide";
import PanelHeader from "@/components/PanelHeader.vue";

const { isWideEnough, isCurrentPanelComponent } = useShowOrHide(360*3);
const props = defineProps({
  contact: Object,
  showBack: Boolean,
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
  <div class="notes-list">
    <div v-show="isWideEnough || isCurrentPanelComponent" class="side-panel">
      <div class="flex flex-col gap-2">
        <PanelHeader :show-back="showBack">
          <h1>Notes List</h1>
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

    <div v-show="isWideEnough || !isCurrentPanelComponent" class="content-area">
      <router-view @add="addContactNote" :show-back="!isWideEnough" />
    </div>

  </div>
</template>

<style lang="scss" scoped>
.notes-list {
  @include split-panel-view;
}
</style>
