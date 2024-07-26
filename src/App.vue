<template>
  <MainBar class="main-bar"/>
  <WorkSpace class="workspace"/>
  <button @click="addNewRecord">new record</button>
  <button @click="editRecord">Edit record</button>
  <button @click="deleteRecord">Delete record</button>
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
}
</style>
