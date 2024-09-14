<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col gap-2">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Back to Contact List</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
</div>

</template>
