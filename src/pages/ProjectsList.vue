<template>
    <ListView>
        <ProjectItem 
            v-for="(project, index) in projectList"
            :key="`project ${index+1}`"
            :project="project"
            :tasks-list="project.tasks"
            :people="peopleWorkingOnProject"
            :deadline="deadline"
            :show="isProjectDetailOpened[index]"
            @clicked="onClickedProject(index)"
            :id="project.id"
            /> 
    </ListView>
</template>

<script setup>
    import ProjectItem from '@/components/ProjectItem.vue';
    import { ref ,computed, onMounted } from 'vue';
    import ListView from '@/layouts/ListView.vue';
    import { usePinia } from '@/store';

    const pinia = usePinia()

    // Data
    const projectList = computed(() => pinia.projects)
    const isProjectDetailOpened = ref(projectList.value.map(project => false))
    const deadline = computed(() => "13-4-2023")
    const peopleWorkingOnProject = computed(() => 4)

    // Methods
    function onClickedProject (index) {
        const projectId = projectList.value[index].id
        pinia.fetchTasksByProjects(projectId)
        isProjectDetailOpened.value[index] = !isProjectDetailOpened.value[index]
    }

    // Lifecycle hooks
    onMounted(()=>{
        pinia.fetchProjects()
    })


    /*     

    const project = computed(()=>{
        return store.state.projects.find((project) => project.id === props.id)
    })

    const deadline = computed(()=>{
        return project.value.tasks.reduce((acc, cur) => acc < cur.date ? cur.date : acc ,"")
    })

     */


</script>
