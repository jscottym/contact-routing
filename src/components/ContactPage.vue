<script setup lang="ts">
import { useAsyncState } from "@vueuse/core";
import { useRoute } from "vue-router";
import { useContactsStore } from "@/stores/contactStore";
import {onMounted, watch} from "vue";

const route = useRoute();
const { getContactById } = useContactsStore();
const { state: contact, isLoading, execute: loadContact } = useAsyncState(
  async () => {
    return await getContactById(route.params.contactId as string);
  }, {}, { immediate: false }
);

onMounted(()=>{
  console.log('ContactPage mounted');
  loadContact();
})

watch(()=>route.params.contactId, (newVal)=> {
  console.log('contactId watcher fired', newVal);
  loadContact();
}, {immediate: false});

</script>

<template>
  <div>
    <h1>ContactPage Component ({{ route.params.contactId }})</h1>
    <router-view :contact="contact" />
  </div>
</template>
