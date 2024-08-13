<template>
    <div class="container">
            <Suspense>
                <MainBarTopNavigation class="navigation-wrapper"/>
            </Suspense>
            <Suspense>
                <MainBarProjectsArea class="projects-wrapper"/>
            </Suspense>
            <MainBarBottomButtons class="buttons-wrapper"/>
    </div>
</template>

<script setup>
    import MainBarTopNavigation from '@/components/mainBar/MainBarTopNavigation.vue';
    import MainBarProjectsArea from '@/components/mainBar/MainBarProjectsArea.vue';
    import MainBarBottomButtons from './mainBar/MainBarBottomButtons.vue';
</script>

<style lang="scss" scoped>
    @import "@/assets/main.scss";

    .container {
        position: relative;
        display:flex;
        flex-direction: column;
        background: $color-background-mainbar;

        min-height: 100vh;
        
        padding: 0;
        .navigation-wrapper {
            padding: 3rem 3rem 1.5rem;
        }
        .projects-wrapper {
            padding: 1.5rem 2rem;
            overflow: auto;
        }
        .buttons-wrapper {
            min-width: 100%;
            margin-top: auto;
            position: absolute;
            bottom: 0;
        }
    }
</style>