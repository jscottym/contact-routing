<script setup lang="ts">
import { ref } from "vue";

const newContact = ref({ name: "", email: "" });
</script>

<template>
  <div>
    <h2>Add Contact</h2>
    <form>
      <label>Name: <input v-model="newContact.name" /></label><br />
      <label>Email: <input v-model="newContact.email" /></label><br />
      <!-- Save logic here -->
      <button>save</button>
    </form>
  </div>
</template>
