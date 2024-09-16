<script setup>
import { computed } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router';

const route = useRoute();
const upOneLevelPath = computed(()=> {
  const path = route.path.split('/');
  path.pop();
  return path.join('/');
});
</script>

<template>
  <div class="flex flex-col justify-start h-full gap-2">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Back Home</RouterLink>
          <RouterLink :to="upOneLevelPath">Up a level</RouterLink>
          <RouterLink to="/grid">Grid styling</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
</div>

</template>

<style scoped>
nav {
  display: flex;
  gap: 1rem;
}
</style>
