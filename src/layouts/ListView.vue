<template>
    
    <div v-if="true" class="list-view-container">
        
    </div>
    <div class="todo-list-view-container">
        
    </div>
    <div class="person-list-view-container">
        
            
    </div>

</template>

<script setup>
    import { ref } from 'vue'



    // TASKS
    

</script>

<style lang="scss" scoped>
    @import '@/assets/base.scss';
    .list-view-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;
    }
    .todo-list-view-container {
        display: flex;
        flex-direction: column;
        padding: 2rem;
        gap: 2px;
        background: white;
    }
    .person-list-view-container {
        display: flex;
        flex-direction: column;
        padding: 2rem;
        gap: 1rem;

    }
</style>