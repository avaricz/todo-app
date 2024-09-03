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
                @onclick="openModal(project.id)"
                >
                    <img width="16px" height="16px" src="@/img/icons/delete.svg" alt="" >
                </StandardButton>
            </li>
        
        </ul>
        
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
        @confirm="deleteProject" />
    </div>

</template>

<script setup>
    import StandardButton from '../form/StandardButton.vue';
    import DefaultModal from '../DefaultModal.vue';
    import { usePinia } from '@/store';
    import { computed, ref } from 'vue';
    import {methods, paths} from '@/data/db'

    const pinia = usePinia()
    const { get } = methods
    const { allTasks } = paths
    // Data
    const projectsList = computed(() => {
        return pinia.projects
    })

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