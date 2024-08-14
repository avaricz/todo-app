<template>
    
    <div class="list-view-container">
        <slot></slot>
    </div>
    
</template>

<script setup>
</script>

<style lang="scss" scoped>
    @import '@/assets/base.scss';
    .list-view-container {
        display: flex;
        flex-direction: column;
        gap: .3rem;
        padding: 2rem;
        max-width: 1024px;
        margin: 0 auto;
        height: 100%;
    }
</style>