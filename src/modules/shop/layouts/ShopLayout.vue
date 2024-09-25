<template>
  <!-- component -->

  <TopMenu></TopMenu>

  <router-view></router-view>

  <!-- Footer -->
  <CustomFooter></CustomFooter>
</template>

<script lang="ts" setup>
import CustomFooter from '../components/CustomFooter.vue';
import TopMenu from '../components/TopMenu.vue';
</script>
