<script setup>
import { storeToRefs } from "pinia";
import { useFakeContactsStore } from "@/stores/fakeContactsStore";
import { useRoute, useRouter } from "vue-router";
import useBasePath from "../composables/useBasePath";

const route = useRoute();
const router = useRouter();

const { basePath, navigateToDetails } = useBasePath('contact', {
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
    <div class="panel p-4">
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

    <!-- Pass basePath to router-view or use as needed -->
    <router-view :basePath="basePath"/>
  </div>
</template>

<style scoped>
.main-wrapper {
  height: 100dvh;
}
</style>
