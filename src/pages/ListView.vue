<template>
    
    <div class="list-view-container">
        <ProjectItem /> 
        <ul>
            <li v-for="item in database">{{item}}</li>
        </ul>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import  { projects}  from '@/data/db.js'
import ProjectItem from '@/components/ProjectItem.vue'

const database = ref(projects.map(item => item.project))
</script>

<style lang="scss" scoped>
    .list-view-container {
        padding: 2rem;
    }
</style>