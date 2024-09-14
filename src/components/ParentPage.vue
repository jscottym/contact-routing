<script setup>
import useScreenWidth from "@/composables/useScreenWidth";

const { isUltraWide } = useScreenWidth();

</script>

<template>
  <div class="flex gap-2">
    <div v-show="isUltraWide || isListRoute" class="panel p-4">
      <h1>ContactFeed ({{ route.params.contactId }})</h1>

      <div>{{ contact.name }}</div>


      <div class="flex flex-col px-2">
        <RouterLink :to="`${basePath}/${contact.id}/details`">Contact Details</RouterLink>
        <RouterLink :to="`${basePath}/${contact.id}/notes`">Notes</RouterLink>
      </div>
    </div>

    <div v-show="isUltraWide || !isListRoute">
      <RouterView :contact="contact"/>
    </div>

  </div>
</template>
