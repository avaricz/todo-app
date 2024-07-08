<template>
    
    <div class="list-view-container">
        <ProjectItem 
        v-for="(project, index) in projectList"
        :key="`project ${index}`"
        :name="project.project"
        :description="project.description"
        :people="project.people.length"
        :deadline="'2024-01-10'"
        @clicked="onClicked(index)"
        :show="openedDetails[index]"
        /> 
 
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import ProjectItem from '@/components/ProjectItem.vue'
    import  { projects }  from '@/data/db.js'

    const projectList = ref(projects)

    const openedDetails = ref(projectList.value.map(project => {
        return false
    }))
    console.log(openedDetails.value)

    const onClicked = (index) => {
        openedDetails.value[index] = !openedDetails.value[index]
        console.log(openedDetails.value)
    }

</script>

<style lang="scss" scoped>
    .list-view-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;
    }
</style>