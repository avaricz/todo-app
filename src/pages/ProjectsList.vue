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
            @clicked-delete="openModal"
            :id="project.id"
            /> 
    </ListView>

    <DefaultModal
    :show="showModal"
    :msg="modalMsg"
    @close-me=""
    @cancel="closeModal"
    @confirm="deleteProject"
    cancelBtn
    confirmBtn
  />
</template>

<script setup>
    import ProjectItem from '@/components/ProjectItem.vue';
    import { ref ,computed, onMounted } from 'vue';
    import ListView from '@/layouts/ListView.vue';
    import { usePinia } from '@/store';
    import DefaultModal from '@/components/DefaultModal.vue'

    const pinia = usePinia()

    // Data
    const projectList = computed(() => pinia.projects)
    const isProjectDetailOpened = ref(projectList.value.map(project => false))
    const deadline = computed(() => "13-4-2023")
    const peopleWorkingOnProject = computed(() => 4)

    // Modal
    const showModal = ref(false)
    const modalMsg = ref('Adamuv modalek')
    function openModal () {
        showModal.value = true
    }
    function closeModal () {
        console.log('closeModal');
        showModal.value = false
    }
    function deleteProject () {
    }
    
    // Methods
    function onClickedProject (index) {
        const projectId = projectList.value[index].id
        pinia.fetchTasksByProjects(projectId)
        pinia.fetchPersonsTasks()
        isProjectDetailOpened.value[index] = !isProjectDetailOpened.value[index]
    }

    // Lifecycle hooks
    onMounted(()=>{
        pinia.fetchProjects()
    })
</script>
