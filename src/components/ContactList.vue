<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useFakeContactsStore } from "@/stores/fakeContactsStore";
import useBasePath from "../composables/useBasePath";
import { useMediaQuery } from "@vueuse/core";
import useShowOrHide from "../composables/useShowOrHide";

const { isWideEnough, isCurrentRoute } = useShowOrHide(751, /^\/contacts$/);
const isBigEnough = useMediaQuery('(min-width: 751px)');

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
    <div v-show="isBigEnough || isCurrentRoute" class="panel p-4">
      <h1>Contact List</h1>

      <div>Base: {{ basePath }}</div>

      <ul>
        <li v-for="contact in contacts" :key="contact.id">
          <RouterLink :to="`${basePath}/${contact.id}`">
            {{ contact.name }}
          </RouterLink>
        </li>
      </ul>
    </div>

    <div v-show="isBigEnough || !isCurrentRoute">
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  height: 100dvh;
}
</style>
