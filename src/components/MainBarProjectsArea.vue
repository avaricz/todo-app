<template>


    <div class="projects-container">
       
        <div class="header">Projects</div>
        <ul class="list-of-projects">
            
            <li v-for="project in projectsList">
                <img src="@/img/icons/project.svg" alt="">
                {{ project.project }}
                <div> {{ project.uncompletedcount }} / {{project.taskscount}}</div>
            </li>
        
        </ul>
        
    </div>
    <button @click="addProject">add project</button>
    <button @click="addTask">add task</button>
    <button @click="addPerson">add person</button>
    <button @click="addPosition">add position</button>



</template>

<script setup>
    import { paths, methods } from '@/data/db1.js';

    const {
        allPersons,
        allPositions, 
        allProjects, 
        allTasks 
    } = paths

    const projectsList = await methods.get(paths.allProjects)
    
    const personsList = await methods.get(paths.allPersons)
    
    const tasksList = await methods.get(paths.allTasks)
    
    const positionsList = await methods.get(paths.allPositions)
    
    const addProject = () => {
        const path = paths.allProjects
        const body = {
                        project: 'AH - Project1', 
                        description: 'Adamuv pokus'
                    }
        methods.post(path, body)
    }

    const addTask = () => {
        const path = paths.allTasks
        const body = {
                        task: 'AH - zase neco', 
                        date: "2024-10-02",
                        completed: 1,
                        priority: 2,
                        projectid: 1,
                    }
        methods.post(path, body)
    }

    const addPerson = () => {
        const path = paths.allPersons
        const body = {
                        first: 'Machr', 
                        last: "Designovy",
                        positionid: 3,
                    }
        methods.post(path, body)
    }

    const addPosition = () => {
        const path = paths.allPositions
        const body = {
                        position: 'frontendak', 
                    }
        methods.post(path, body)
    }
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