<script setup>
import {watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useAsyncState} from "@vueuse/core";
import useBasePath from "@/composables/useBasePath";
import {useFakeContactsStore} from "@/stores/fakeContactsStore";
import PanelHeader from "@/components/PanelHeader.vue";

defineProps({
    showBack: Boolean,
});

const route = useRoute();

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
  <div class="notes-details">
    <router-view v-slot="{ Component }">
      <template v-if="Component">
        <component :is="Component" :note="note" :show-back="showBack" @save="saveNote"/>
      </template>

      <template v-else>
        <div class="panel">
          <div v-if="isLoading">Loading...</div>

          <div v-if="error">Can't load that note</div>

          <PanelHeader :show-back="showBack">
            <h1>Note Details</h1>
          </PanelHeader>

          <div>Id: {{ note.id }}</div>
          <div>Content: {{ note.content }}</div>

          <button @click="navigateToEdit">Edit</button>
        </div>
      </template>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.notes-details {
  @include split-panel-view;
}
</style>
