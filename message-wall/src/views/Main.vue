<template>
  <top-bar />
  <router-view />
  <foot-bar />
</template>

<script setup>
import TopBar from '../components/TopBar.vue';
import FootBar from '../components/FootBar.vue';
import { ref, reactive } from 'vue'

</script>
<style lang='less' scoped></style>