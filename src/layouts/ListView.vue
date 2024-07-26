<template>
    
    <div v-if="true" class="projects-list-view-container">
        <slot name="projects"></slot>
    </div>
    <div class="todos-list-view-container">
        <slot name="tasks"></slot>
    </div>
    <div class="persons-list-view-container">
        
        <slot name="persons"></slot>
    </div>

</template>

<script setup>
</script>

<style lang="scss" scoped>
    @import '@/assets/base.scss';
    .projects-list-view-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;
    }
    .todos-list-view-container {
        display: flex;
        flex-direction: column;
        padding: 2rem;
        gap: 2px;
        background: white;
    }
    .persons-list-view-container {
        display: flex;
        flex-direction: column;
        padding: 2rem;
        gap: 1rem;

    }
</style>