<script setup>
import { useAsyncState } from "@vueuse/core";
import { useRoute } from "vue-router";
import { useFakeContactsStore } from "@/stores/fakeContactsStore";
import {onMounted, watch, getCurrentInstance, computed, provide} from "vue";
import useBasePath from "@/composables/useBasePath";
import useShowOrHide from "../composables/useShowOrHide";
import PanelHeader from "@/components/PanelHeader.vue";
import { cloneDeep } from "lodash";

const props = defineProps({
    contactId: Number,
    panelSubtract: {
        type: Number,
        default: 0,
    },
});
const route = useRoute();

watch(()=>props.panelSubtract, (newVal)=> {
  provide('panelSubtract', props.panelSubtract);
}, {immediate: true});

const { basePath, navigateToDetails } = useBasePath('contact');
const { isWideEnough, isCurrentRoute } = useShowOrHide(750, /^\/contacts\/[^/]+$/);

const { getContactById, updateContact } = useFakeContactsStore();
const contactId = computed(()=> props.contactId ?? route.params.contactId);
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
    <div v-show="isWideEnough.value || isCurrentRoute" class="panel p-4">
      <PanelHeader :show-back="!isWideEnough.value">
        <h1>Contact</h1>
      </PanelHeader>

      <div>{{ contact.name }} (id: {{ route.params.contactId }})</div>


      <div class="flex flex-col px-2">
        <RouterLink :to="`${basePath}/${contact.id}/details`">Contact Details</RouterLink>

        <RouterLink :to="`${basePath}/${contact.id}/notes`">Notes</RouterLink>

        Panel width subtract: {{ props.panelSubtract }}
      </div>
    </div>

    <div v-show="isWideEnough.value || (!isCurrentRoute)">
      <RouterView
          :contact="contact"
          :show-back="!isWideEnough.value"
          @save="saveContact"
      />
    </div>

  </div>
</template>
