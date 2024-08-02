<template>
    <ListView #projects>
        <ProjectItem 
            v-for="(project, index) in projectList"
            :key="`project ${index+1}`"
            :name="project.project"
            :description="project.description"
            :people="5"
            :deadline="'2024-01-10'"
            @clicked="onClickedProject(index)"
            :show="isProjectDetailOpened[index]"
            /> 
    </ListView>
</template>

<script setup>
    import { ref } from 'vue'
    import ProjectItem from '@/components/ProjectItem.vue';
    import ListView from '@/layouts/ListView.vue';
    import  { methods, paths }  from '@/data/db.js'

    const { get } = methods
    const { allProjects } = paths
    

    const projectList = ref(await get(allProjects))
    
    const isProjectDetailOpened = ref(projectList.value.map(project => false))

    const onClickedProject = (index) => isProjectDetailOpened.value[index] = !isProjectDetailOpened.value[index]
</script>
