<script setup>
import { useAsyncState } from "@vueuse/core";
import { useRoute } from "vue-router";
import { useFakeContactsStore } from "@/stores/fakeContactsStore";
import {onMounted, watch, computed} from "vue";
import useBasePath from "@/composables/useBasePath";
import useScreenWidth from "@/composables/useScreenWidth";

const screenWidth = useScreenWidth();
const isBigEnough = computed(()=> screenWidth.isTabletOrWider);

const route = useRoute();
const { basePath, isListRoute } = useBasePath('contact');

const { getContactById } = useFakeContactsStore();
const { state: contact, isLoading, execute: loadContact } = useAsyncState(
  async () => {
    return await getContactById(route.params.contactId);
  }, {}, { immediate: false }
);

onMounted(()=>{
  console.log('ContactFeed mounted');
  loadContact();
})

watch(()=>route.params.contactId, (newVal)=> {
  console.log('contactId watcher fired', newVal);
  loadContact();
}, {immediate: false});

</script>

<template>
  <div class="flex gap-2">
    <div v-show="isBigEnough || isListRoute" class="panel p-4">
      <h1>ContactFeed ({{ route.params.contactId }})</h1>

      <div>{{ contact.name }}</div>


      <div class="flex flex-col px-2">
        <RouterLink :to="`${basePath}/${contact.id}/details`">Contact Details</RouterLink>
        <RouterLink :to="`${basePath}/${contact.id}/notes`">Notes</RouterLink>
      </div>
    </div>

    <div v-show="isBigEnough || !isListRoute">
      <RouterView :contact="contact"/>
    </div>

  </div>
</template>
