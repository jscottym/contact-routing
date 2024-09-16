<template>
  <div class="header-wrapper">
    <button v-if="showBack" @click="goUpOneLevel" class="back-button">
      🔙
    </button>
    <slot />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  showBack: {
    type: Boolean,
    default: true, // Default to true to show the back button
  },
});

const route = useRoute();
const router = useRouter();

const upOneLevelPath = computed(() => {
  let path = route.path.split('/');
  path.pop();

  while (path.length > 1) {
    const resolvedRoute = router.resolve({ path: path.join('/') });

    if (resolvedRoute && resolvedRoute.matched && resolvedRoute.matched.length) {
      break;
    }

    path.pop();
  }

  return path.join('/') || '/';
});

const goUpOneLevel = () => {
  router.push(upOneLevelPath.value);
};
</script>

<style scoped>
.header-wrapper {
  display: flex;
  align-items: center;
}

.back-button {
  margin-right: 8px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 2rem;
}
</style>
