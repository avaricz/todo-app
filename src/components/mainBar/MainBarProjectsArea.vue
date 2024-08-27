<template>

    <div class="projects-container">
       
        <div class="header">Projects</div>

        <ul class="list-of-projects">
            
            <li
            v-for="project in projectsList"
            :key="project.id"
            >
                <img src="@/img/icons/project.svg" alt="">
                {{ project.project }}
                <StandardButton 
                class="bin-icon"
                :label="''" 
                :type="'button'" 
                @onclick="deleteProject(project.id)"
                >
                    <img width="16px" height="16px" src="@/img/icons/delete.svg" alt="" >
                </StandardButton>
            </li>
        
        </ul>
        
    </div>

</template>

<script setup>
    import StandardButton from '../form/StandardButton.vue';
    import { usePinia } from '@/store';
    import { computed } from 'vue';

    const pinia = usePinia()

    // Data
    const projectsList = computed(() => {
        return pinia.projects
    })

    // Methods
    function deleteProject (projectId) {
        //meziclanek
        pinia.deleteProject(projectId)
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
        gap: 1rem;

        padding: 0;

        list-style-type: none;
        li {
            display: flex;
            gap: .5rem;
            align-items: center;

            font-size: 1.0rem;
            font-weight: 600;
            img{
                height: 1.6rem;
            }
            .bin-icon{
                margin-left: auto;
                &:hover {
                    background-color: $gray-dr;
                }
                &:active {
                    box-shadow: 0 0 -5px 10px black;
                }
            }
        }
    }
</style>