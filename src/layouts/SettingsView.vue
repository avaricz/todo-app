<template>
    
    <div class="settings-container">
        <slot></slot>
    </div>

</template>

<script setup>
</script>

<style lang="scss" scoped>
    @import '@/assets/base.scss';
    .settings-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;
    }

</style>