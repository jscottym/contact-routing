<script setup>
import { storeToRefs } from "pinia";
import { useFakeContactsStore } from "@/stores/fakeContactsStore";
import useBasePath from "../composables/useBasePath";
import { useMediaQuery } from "@vueuse/core";
import useShowOrHide from "../composables/useShowOrHide";

const { isWideEnough, isCurrentPanelComponent } = useShowOrHide(751, /^\/contacts$/);

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

      <ul>
        <li v-for="contact in contacts" :key="contact.id">
          <RouterLink :to="`${basePath}/${contact.id}`">
            {{ contact.name }}
          </RouterLink>
        </li>
      </ul>
    </div>

    <div v-show="isWideEnough || !isCurrentPanelComponent" >
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  height: 100dvh;
}
</style>
