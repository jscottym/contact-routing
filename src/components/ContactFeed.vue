<script setup>
import { useAsyncState } from "@vueuse/core";
import { useRoute } from "vue-router";
import { useFakeContactsStore } from "@/stores/fakeContactsStore";
import {onMounted, watch, getCurrentInstance, computed} from "vue";
import useBasePath from "@/composables/useBasePath";
import useShowOrHide from "../composables/useShowOrHide";
import PanelHeader from "@/components/PanelHeader.vue";
import { cloneDeep } from "lodash";

const { isWideEnough, isCurrentRoute } = useShowOrHide(1470, /^\/contacts\/[^/]+$/);
const route = useRoute();

const { basePath, navigateToDetails } = useBasePath('contact');

const { getContactById, updateContact } = useFakeContactsStore();
const { state: contact, isLoading, execute: loadContact } = useAsyncState(
  async () => {
    return cloneDeep(await getContactById(route.params.contactId));
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

async function saveContact(contact) {
  console.log('saving contact', contact);

  await updateContact(contact.id, contact);

  navigateToDetails();
}

</script>

<template>
  <div class="flex gap-2">
    <div v-show="isWideEnough || isCurrentRoute" class="panel p-4">
      <PanelHeader :show-back="!isWideEnough">
        <h1>Contact</h1>
      </PanelHeader>

      <div>{{ contact.name }} (id: {{ route.params.contactId }})</div>


      <div class="flex flex-col px-2">
        <RouterLink :to="`${basePath}/${contact.id}/details`">Contact Details</RouterLink>

        <RouterLink :to="`${basePath}/${contact.id}/notes`">Notes</RouterLink>
      </div>
    </div>

    <div v-show="isWideEnough || (!isCurrentRoute)">
      <RouterView
          :contact="contact"
          :show-back="!isWideEnough"
          @save="saveContact"
      />
    </div>

  </div>
</template>
