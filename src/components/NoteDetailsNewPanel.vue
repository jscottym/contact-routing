<script setup>
import {watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useAsyncState} from "@vueuse/core";
import useBasePath from "@/composables/useBasePath";
import {useFakeContactsStore} from "@/stores/fakeContactsStore";
import PanelHeader from "@/components/PanelHeader.vue";
import useShowOrHide from "@/composables/useShowOrHide.js";

const route = useRoute();
const { isWideEnough, isCurrentPanelComponent } = useShowOrHide(360*4);

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
  <div class="note-details">
    <div v-show="isWideEnough || isCurrentPanelComponent" class="side-panel">
      <div v-if="isLoading">Loading...</div>

      <div v-if="error">Can't load that note</div>

      <PanelHeader :show-back="!isWideEnough">
        <h1>Note Details</h1>
      </PanelHeader>

      <div>Id: {{ note.id }}</div>
      <div>Content: {{ note.content }}</div>

      <button @click="navigateToEdit">Edit</button>
    </div>

    <div v-show="isWideEnough || !isCurrentPanelComponent" class="content-area">
      <router-view :note="note" :show-back="!isWideEnough" @save="saveNote" />
    </div>
  </div>

</template>

<style lang="scss" scoped>
.note-details {
  @include split-panel-view;
}
</style>

