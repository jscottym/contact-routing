<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useContactsStore } from "@/stores/contactStore";
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const baseContactPath = route.matched.find(
  (record) => record.components.default === route.matched[0]?.components.default
)?.path;

const { contacts } = storeToRefs(useContactsStore());

function openContact(contactId) {
  console.log('current route', route.path);
  router.push(`${baseContactPath}/contact/${contactId}`);
}
</script>

<template>
  <div class="main-wrapper flex gap-2">
    <div>
      <h1>Contact List</h1>

      <ul>
        <li v-for="contact in contacts" :key="contact.id">
          <router-link :to="`${baseContactPath}/contact/${contact.id}`">
            {{ contact.name }}
          </router-link>
        </li>
      </ul>
    </div>

    <router-view/>
  </div>
</template>

<style scoped>
.main-wrapper {
  height: 100dvh;
}
</style>
