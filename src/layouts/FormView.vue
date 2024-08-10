<template>
    
    <div v-if="$route.path === '/form-project'" class="project-form-container">
        <slot name="project-form"></slot>
    </div>

    <div v-if="$route.path === '/form-task'" class="task-form-container">
        <slot name="task-form"></slot>
    </div>

    <div v-if="$route.path === '/form-person'" class="person-form-container">
        <slot name="person-form"></slot>
    </div>


</template>

<script setup>
</script>

<style lang="scss" scoped>
    @import '@/assets/base.scss';
    .project-form-container, .task-form-container,
    .person-form-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;
    }

</style>