<script setup>
import { defineProps } from "vue";
import useBasePath from "../composables/useBasePath";
import PanelHeader from "@/components/PanelHeader.vue";

defineProps({
  contact: Object,
  showBack: Boolean,
});

const { navigateToDetails } = useBasePath('contact');

</script>

<template>
  <div class="panel">
    <PanelHeader :show-back="showBack">
      <h1>Edit Contact</h1>
    </PanelHeader>

    <form v-if="contact">
      <label>Name: <input v-model="contact.name" /></label><br />
      <label>Email: <input v-model="contact.email" /></label><br />
      <button type="submit" @click="navigateToDetails">Back to details</button>
    </form>
  </div>
</template>
