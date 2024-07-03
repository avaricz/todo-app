<template>
    <div class="container">
        <MainBarTopNavigation />
        <MainBarProjectsArea />
    </div>
</template>

<script setup>
    import MainBarTopNavigation from '@/components/MainBarTopNavigation.vue';
    import MainBarProjectsArea from '@/components/MainBarProjectsArea.vue';
</script>

<style lang="scss" scoped>

    @import "@/assets/main.scss";

    .container {
        display:flex;
        flex-direction: column;
        gap: 3rem;
        background: $color-background-mainbar;

        min-height: 100vh;
        
        padding: 3rem 2rem;

    }



</style>