<template>
    <div class="filter-bar">
        <img src="@/img/icons/sidebar2.svg" alt="" height="24px" class="sidebar-icon">
        <i class="pi pi-filter"></i>
        <p>Filter by: </p>
        <i class="pi pi-sort-alt"></i>
        <p>Sort:</p>
        <i class="pi pi-check-circle"></i>
        <p>is  done </p>
    </div>
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
    .filter-bar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        background: $gray;
        height: 3rem;
        position: sticky;
        top: 0;
        .sidebar-icon {
            transform: rotate(180deg);
        }
    }
</style>