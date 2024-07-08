<template>

    <div class="projects-container">
       
        <div class="header">Projects</div>
       
        <ul class="list-of-projects">
            
            <li v-for="project in projectsList">
                <img src="@/img/icons/project.svg" alt="">
                {{ project }}
                <div>(3/6)</div>
            </li>
        
        </ul>
    
    </div>
    
</template>

<script setup>
    import { ref } from 'vue'
    import { projects } from '@/data/db.js';

    const projectsList = ref(projects.map(project => project.project))
    const test = ref()

</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';
    .projects-container {
        display: flex;
        flex-direction:column;
        align-items:  start;
    }
    .header {
        color: $black-lt;
        font-size: .8rem;

        padding-bottom: 1rem;
    }
    .list-of-projects {
        display: flex;
        flex-direction: column;
        gap: 2rem;

        padding: 0;

        list-style-type: none;
        li {
            display: flex;
            gap: .5rem;
            align-items: center;

            font-size: 1.1rem;
            font-weight: 600;
            img{
                height: 1.6rem;
            }
        }
    }

</style>