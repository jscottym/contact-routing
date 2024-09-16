<script setup>
import { defineProps } from "vue";
import PanelHeader from "@/components/PanelHeader.vue";
import {useVModel} from "@vueuse/core";

const props = defineProps({
  contact: Object,
  showBack: Boolean,
});

const emit = defineEmits(['save']);

const contact = useVModel(props, 'contact', emit);
</script>

<template>
  <div class="panel">
    <PanelHeader :show-back="showBack">
      <h1>Edit Contact</h1>
    </PanelHeader>

    <label>Name: <input v-model="contact.name"/></label><br/>
    <label>Email: <input v-model="contact.email"/></label><br/>
    <button @click="emit('save', contact)">Save contact</button>
  </div>
</template>
