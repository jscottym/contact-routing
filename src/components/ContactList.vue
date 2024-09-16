<script setup>
import { storeToRefs } from "pinia";
import { useFakeContactsStore } from "@/stores/fakeContactsStore";
import useBasePath from "../composables/useBasePath";
import useShowOrHide from "../composables/useShowOrHide";
import {provide} from "vue";

const listPanelSize = 750;
const { isWideEnough, isCurrentPanelComponent } = useShowOrHide(listPanelSize, /^\/contacts$/);

const { basePath, isListRoute, navigateToDetails } = useBasePath('contact', {
    doProvide: true,
    basePath: '/contacts'
});

const { contacts } = storeToRefs(useFakeContactsStore());


function openContact(contactId) {
  navigateToDetails(contactId);
}
</script>

<template>
  <div class="main-wrapper flex gap-2">
    <div v-show="isWideEnough || isCurrentPanelComponent" class="panel p-4">
      <h1>Contact List</h1>

     <div class="flex flex-col gap-2">
        <RouterLink
            v-for="contact in contacts" :key="contact.id"
              :to="`${basePath}/${contact.id}`"
        >
          <div class="p-4 ring-1" >
              {{ contact.name }}
          </div>
        </RouterLink>
     </div>
    </div>

    <div v-show="isWideEnough || !isCurrentPanelComponent" >
      <router-view :panel-subtract="listPanelSize"/>
    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  height: 100dvh;
}
</style>
