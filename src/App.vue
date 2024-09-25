<template>
  <router-view></router-view>
  <VueQueryDevtools></VueQueryDevtools>
</template>

<script lang="ts" setup>
import { VueQueryDevtools } from '@tanstack/vue-query-devtools';
</script>
