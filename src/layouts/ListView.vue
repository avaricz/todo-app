<template>
    
    <div v-if="$route.path === '/projects'" class="projects-list-view-container">
        <slot name="projects"></slot>
    </div>
    <div v-if="$route.path === '/tasks'" class="todos-list-view-container">
        <slot name="tasks"></slot>
    </div>
    <div v-if="$route.path === '/persons'" class="persons-list-view-container">
        
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
        max-width: 1024px;
        margin: 0 auto;
    }
    .todos-list-view-container {
        display: flex;
        flex-direction: column;
        padding: 2rem;
        gap: 2px;
        background: white;
        max-width: 1024px;
        margin: 0 auto;
    }
    .persons-list-view-container {
        display: flex;
        flex-direction: column;
        padding: 2rem;
        gap: 1rem;
        max-width: 1024px;
        margin: 0 auto;

    }
</style>