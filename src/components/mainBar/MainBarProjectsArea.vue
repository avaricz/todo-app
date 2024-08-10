<template>

    <div class="projects-container">
       
        <div class="header">Projects</div>

        <ul class="list-of-projects">
            
            <li v-for="project in projectsList">
                <img src="@/img/icons/project.svg" alt="">
                {{ project.project }}
                <StandardButton :label="''" :type="'button'" @onclick="deleteProject(project.id)">
                    <img width="16px" height="16px" src="@/img/icons/delete.svg" alt="">
                </StandardButton>
            </li>
        
        </ul>
        
    </div>

</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import { paths, methods } from '@/data/db.js';
    import StandardButton from '../form/StandardButton.vue';

    //Data
    const projectsList = ref([])


    const getProjectsData = () => {
        return methods.get(paths.allProjects)
    }

    onMounted(async () => {
        const data = await getProjectsData()
        projectsList.value = data
    })


    // Delete Projects
    const deleteProject = async (projectId) => {
        methods.delete(paths.allProjects, projectId)
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