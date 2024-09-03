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
            @clicked-delete="openModal(project.id)"
            :id="project.id"
            /> 
    </ListView>
    
    <DefaultModal
    v-if="showModal"
    :msg="modalSetup.contentMsg"
    :header="modalSetup.header"
    :data="modalSetup.dataForConfirm"
    :cancel-btn="modalSetup.cancelBtn"
    :confirm-btn="modalSetup.confirmBtn"
    :cancel-label="modalSetup.cancelLabel"
    @close-me="closeModal"
    @cancel="closeModal"
    @confirm="deleteProject"
    />

</template>

<script setup>
    import ProjectItem from '@/components/ProjectItem.vue';
    import { ref ,computed, onMounted } from 'vue';
    import ListView from '@/layouts/ListView.vue';
    import { usePinia } from '@/store';
    import DefaultModal from '@/components/DefaultModal.vue'
    import {methods, paths} from '@/data/db'

    const pinia = usePinia()
    const { get } = methods
    const { allTasks } = paths

    // Data
    const projectList = computed(() => pinia.projects)
    const isProjectDetailOpened = ref(projectList.value.map(project => false))
    const deadline = computed(() => "13-4-2023") // TODO
    
    const peopleWorkingOnProject = computed(() => 4) //TODO


    // Modal
    const showModal = ref(false)

    const modalSetup = ref({
        header: '',
        contentMsg: '',
        cancelBtn: false,
        confirmBtn: false,
        cancelLabel: '',
        confirmLabel: '',
        dataForConfirm: '',
    })

    function openModal (id) {
        modalSetup.value.dataForConfirm = id
        hasProjectAnyTask(id).then( data => {
            if (data.length) {
                modalSetup.value.header = `Nelze smazat`
                modalSetup.value.contentMsg = `Projekt nelze smazat. 
                Pocet navazanych ukolu: ${data.length}`
                modalSetup.value.cancelBtn = true
                modalSetup.value.cancelLabel = 'Cancel'
                
            } else {
                
                modalSetup.value.header = `Smazat project`
                modalSetup.value.contentMsg = "Opravdu si prejete tento project smazat?"
                modalSetup.value.cancelBtn = true
                modalSetup.value.cancelLabel = 'Cancel'
                modalSetup.value.confirmBtn = true
            }
        }).then(() => {
            showModal.value = true
        })

    }
    // TODO v pinia opravit metodu fetchTasksByProjects a roydelit ji aby opravdu jen fetch
    const hasProjectAnyTask = (projectid) => {
        return get(`${allTasks}?projectid=${projectid}`).then(data => data) 
    }

    function closeModal () {
        resetModalSetup()
        showModal.value = false
    }

    function deleteProject (projectid) {
        pinia.deleteProject(projectid)
        resetModalSetup()
        closeModal()
    }

    function resetModalSetup () {
        modalSetup.value.header = '',
        modalSetup.value.contentMsg = '',
        modalSetup.value.cancelBtn = false,
        modalSetup.value.confirmBtn = false,
        modalSetup.value.cancelLabel = '',
        modalSetup.value.confirmLabel = '',
        modalSetup.value.dataForConfirm = ''
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
