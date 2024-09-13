<script setup lang="ts">
import { defineProps } from "vue";
import {useRouter} from "vue-router";

defineProps({
  contact: Object,
});
const router = useRouter();
function toEdit() {
  console.log('toEdit');
  router.push('./edit');
}
</script>

<template>
  <div>
    <h2>Contact Details</h2>

    <div v-if="contact">
      <p>Name: {{ contact.name }}</p>
      <p>Email: {{ contact.email }}</p>
    </div>

    <button type="submit" @click="toEdit">Edit Contact</button>
  </div>
</template>

<style scoped></style>
