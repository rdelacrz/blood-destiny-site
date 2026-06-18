<script setup lang="ts">
/* Breadcrumb — "Home / <here>" used on every interior page head. */
defineProps<{ here: string }>();
</script>

<template>
  <div class="crumb">
    <router-link to="/">Home</router-link>
    <span class="sep">/</span>
    <span class="here">{{ here }}</span>
  </div>
</template>
