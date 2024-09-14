<script setup>
import { defineProps } from "vue";
import {useRouter} from "vue-router";
import useBasePath from "../composables/useBasePath";

defineProps({
  contact: Object,
});
const router = useRouter();
function toEdit() {
  console.log('toEdit');
  router.push('edit');
}

const { navigateToEdit } = useBasePath('contact');
</script>

<template>
  <div class="p-4 panel">
    <h1>Contact Details</h1>

    <div v-if="contact">
      <p>Id: {{ contact.id }}</p>
      <p>Name: {{ contact.name }}</p>
      <p>Email: {{ contact.email }}</p>
    </div>

    <button type="submit" @click="navigateToEdit(contact.id)">Edit Contact</button>
  </div>
</template>

<style scoped></style>
