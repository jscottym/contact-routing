<script setup>
import { storeToRefs } from "pinia";
import { useFakeContactsStore } from "@/stores/fakeContactsStore";
import useBasePath from "../composables/useBasePath";
import useShowOrHide from "../composables/useShowOrHide";
import {provide} from "vue";

const contactListPanelWidth = 360;
const { isWideEnough, isCurrentPanelComponent } = useShowOrHide(contactListPanelWidth, /^\/contacts$/);

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
  <div class="main-wrapper contact-list-page">
    <div v-show="isWideEnough || isCurrentPanelComponent" class="side-panel" :style="`min-width: ${contactListPanelWidth}px`">
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

    <div v-show="isWideEnough || !isCurrentPanelComponent" class="content-area" >
      <router-view :panel-offset="contactListPanelWidth"/>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-wrapper {
    flex: 1;
    min-height: 100%;
    width: 100dvw;
}

.contact-list-page {
  @include split-panel-view;
}
</style>
