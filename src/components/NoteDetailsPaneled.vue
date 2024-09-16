<script setup>
import {watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useAsyncState} from "@vueuse/core";
import useBasePath from "@/composables/useBasePath";
import {useFakeContactsStore} from "@/stores/fakeContactsStore";
import PanelHeader from "@/components/PanelHeader.vue";
import useShowOrHide from "@/composables/useShowOrHide.js";

const route = useRoute();
const { isWideEnough, isCurrentPanelComponent } = useShowOrHide(750*3);

const {getNoteById} = useFakeContactsStore();
const {navigateToEdit, navigateToList} = useBasePath('note');

const {state: note, isLoading, error, execute: fetchNote} = useAsyncState(async () => {
    return await getNoteById(route.params.noteId);
}, {}, {immediate: false});

watch(() => route.params.noteId, (newVal) => {
    fetchNote();
}, {immediate: true});

function saveNote(updated) {
    navigateToList();

}
</script>

<template>
  <div class="main-wrapper flex gap-2">
    <div v-show="isWideEnough.value || isCurrentPanelComponent" class="panel">
      <div v-if="isLoading">Loading...</div>

      <div v-if="error">Can't load that note</div>

      <PanelHeader :show-back="!isWideEnough.value">
        <h1>Note Details</h1>
      </PanelHeader>

      <div>Id: {{ note.id }}</div>
      <div>Content: {{ note.content }}</div>

      <button @click="navigateToEdit">Edit</button>
    </div>

    <div v-show="isWideEnough.value || !isCurrentPanelComponent">
      <router-view :note="note" :show-back="!isWideEnough.value" @save="saveNote" />
    </div>
  </div>

</template>
