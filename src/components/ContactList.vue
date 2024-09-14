<script setup>
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useFakeContactsStore } from "@/stores/fakeContactsStore";
import useBasePath from "../composables/useBasePath";
import useScreenWidth from "@/composables/useScreenWidth";

const screenWidth = useScreenWidth();
const isBigEnough = computed(()=> screenWidth.isTabletOrWider);

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
    <pre>{{ { isBigEnough, isListRoute, screenWidth } }}</pre>
    <div v-show="isBigEnough || isListRoute" class="panel p-4">
      <h1>Contact List</h1>

      <div>Base: {{ basePath }}</div>

      <ul>
        <li v-for="contact in contacts" :key="contact.id">
          <RouterLink :to="`${basePath}/${contact.id}/details`">
            {{ contact.name }}
          </RouterLink>
        </li>
      </ul>
    </div>

    <div v-show="isBigEnough || !isListRoute">
      <router-view/>
    </div>
  </div>
</template>

<style scoped>
.main-wrapper {
  height: 100dvh;
}
</style>
