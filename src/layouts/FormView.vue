<template>
    
    <div class="form-container">
        <slot></slot>
    </div>

</template>

<script setup>
</script>

<style lang="scss" scoped>
    @import '@/assets/base.scss';
    .form-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;
    }

</style>