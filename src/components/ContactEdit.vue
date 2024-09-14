<script setup>
import { defineProps } from "vue";
import useBasePath from "../composables/useBasePath";

defineProps({
  contact: Object,
});

const { navigateToDetails } = useBasePath('contact');

</script>

<template>
  <div class="panel">
    <h1>Edit Contact</h1>
    <form v-if="contact">
      <label>Name: <input v-model="contact.name" /></label><br />
      <label>Email: <input v-model="contact.email" /></label><br />
      <button type="submit" @click="navigateToDetails">Back to details</button>
    </form>
  </div>
</template>
