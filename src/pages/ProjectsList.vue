<template>
    <ProjectItem 
        v-for="(project, index) in projectList"
        :key="`project ${index+1}`"
        :name="project.project"
        :description="project.description"
        :people="project.people.length"
        :deadline="'2024-01-10'"
        @clicked="onClickedProject(index)"
        :show="isProjectDetailOpened[index]"
        /> 
</template>

<script setup>
    import { ref } from 'vue'
    import ProjectItem from '@/components/ProjectItem.vue';
    import  { projects }  from '@/data/db.js'

    const projectList = ref(projects)
    
    const isProjectDetailOpened = ref(projectList.value.map(project => false))

    const onClickedProject = (index) => {
        isProjectDetailOpened.value[index] = !isProjectDetailOpened.value[index]
    }

</script>

<style lang="scss" scoped>

</style>