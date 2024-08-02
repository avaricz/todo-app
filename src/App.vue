<template>
  <MainBar class="main-bar"/>
  <WorkSpace class="workspace"/>
</template>

<script setup>
  import MainBar from '@/components/MainBar.vue'
  import WorkSpace from './views/WorkSpace.vue'
</script>

<style lang="scss" scoped>
.main-bar {
  grid-column-start: 1;
  grid-row-end: 2;
}
.workspace {
  grid-column-start: 2;
  overflow: auto;
}
</style>
