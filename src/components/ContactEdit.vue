<script setup lang="ts">
import { defineProps } from "vue";
import {useRouter} from "vue-router";
defineProps({
  contact: Object,
});

function backToDetails() {
  const router = useRouter();
  console.log('backToDetails');
  router.push('../');
}
</script>

<template>
  <div>
    <h2>Edit Contact</h2>
    <form v-if="contact">
      <label>Name: <input v-model="contact.name" /></label><br />
      <label>Email: <input v-model="contact.email" /></label><br />
      <button type="submit" @click="backToDetails">Save Contact</button>
    </form>
  </div>
</template>
