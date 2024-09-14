<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col gap-2">
    <header>
      <div class="wrapper">
        <nav>
          <RouterLink to="/">Back Home</RouterLink>
          <RouterLink to="../">Up a level</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
</div>

</template>
