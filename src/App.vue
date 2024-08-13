<template>
  <MainBar class="main-bar"/>
  <WorkSpace class="workspace"/>
</template>

<script setup>
  import MainBar from '@/components/MainBar.vue'
  import WorkSpace from './views/WorkSpace.vue'
  import { usePinia } from './store';
  import { onMounted } from 'vue';
  
  const pinia = usePinia()

  onMounted(() => {
    pinia.fetchProjects()
  })

</script>

<style lang="scss" scoped>
.main-bar {
  grid-column-start: 1;
  grid-row-end: 2;
}
.workspace {
  grid-column-start: 2;
  overflow: auto;
  max-height: 100vh;
}
</style>
