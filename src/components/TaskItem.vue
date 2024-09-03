<template>
    <div class="task-container"
    @click="openDetail(task.id)">
        <div class="task-body"> 
            <div class="header-area">   
                <div class="checkbox-area">
                    <i 
                    class="pi pointer" 
                    :class="getCheckClass(task.completed)" 
                    @click.stop="changeCompleted"
                    ></i>
                </div> 
                <div class="task-title-area" :class="{completed: task.completed}">
                    {{ task.task }} 
                </div>
            </div>
            <div class="labels-area">

                <div v-if="persons" class="persons-container">
                    <div
                    v-for="person in persons"
                    class="person-avatar"
                    >
                        {{ person.initials }}
                    </div>
                </div>

                <span
                 class="label priority-label" 
                 :class="getPriorityClass(task.priority)"
                 >{{ priorityLabels[task.priority-1] }}</span>
                <span v-if="showProject" class="label project-label bordered">{{ task.project }}</span>
                <span
                 class="label"
                 :class="isOverdue(task.date)"
                 >{{ task.date }}</span>
                <i v-if="showEdit" class="pi pi-cog pointer" @click.stop="editTask(task.id)"></i>
                <i class="pi pi-times-circle pointer red" @click.stop="openModal(task.id)"></i>
                
            </div>
        </div>   
    </div>
    <DefaultModal
        v-if="showModal"
        :msg="modalSetup.contentMsg"
        :header="modalSetup.header"
        :data="modalSetup.dataForConfirm"
        :cancel-btn="modalSetup.cancelBtn"
        :confirm-btn="modalSetup.confirmBtn"
        :cancel-label="modalSetup.cancelLabel"
        :confirm-label="modalSetup.confirmLabel"
        @close-me="closeModal"
        @cancel="closeModal"
        @confirm="deleteTask" />
</template>

<script setup>
    import { ref } from 'vue';
    import { usePinia } from '@/store';
    import { useRouter } from 'vue-router'
    import {methods, paths} from '@/data/db'
    import DefaultModal from './DefaultModal.vue';

    const props = defineProps({
        task: {
            type: Object,
            required: true,
        },
        persons: {
            type: Object,
            required: false,
        },
        showProject: {
            type: Boolean,
            default: true
        },
        showEdit:{
            type: Boolean,
            default: true
        }
    })
    
    const pinia = usePinia()
    const router = useRouter()
    const emit = defineEmits(['changeCompleted'])
    
    const { get } = methods
    const { allTasks } = paths

    // Labels
    const priorityLabels = ['low', 'mid', 'high']
    const getPriorityClass = (priority) => {
        return priorityLabels[priority-1] + '-priority'
    }

    // Done icon
    const checkClasses = ref(['pi-circle', 'pi-check-circle'])
    const getCheckClass = (completed) => {
        return checkClasses.value[completed]
    }
    // is overdue
    const isOverdue = (deadline) => {
        const taskDate = new Date(deadline).getTime()
        const curDate = new Date().getTime()
        return (taskDate < curDate) ? "overdue" : ""
    }

    // Modal
    const showModal = ref(false)

    const modalSetup = ref({
        header: '',
        contentMsg: '',
        cancelBtn: false,
        confirmBtn: false,
        cancelLabel: '',
        confirmLabel: '',
        dataForConfirm: {},
    })

    function openModal (id) {
        modalSetup.value.dataForConfirm.taskid = id

        pinia.fetchPersonsTasks().then( data => {
                const conections = data.filter( element => {
                    if (element.taskid === id){
                        return element

                    }
                })
                modalSetup.value.header = `Delete task`
                modalSetup.value.cancelBtn = true
                modalSetup.value.cancelLabel = 'Cancel'
                modalSetup.value.confirmBtn = true
                modalSetup.value.confirmLabel = 'Delete'
                modalSetup.value.dataForConfirm.conections = conections
                if(conections.length) {
                    modalSetup.value.contentMsg = `Opravdu chcete smazat task i kdyz jsou k nemu prirazeni lide?`
                } else {
                    modalSetup.value.contentMsg = `Opravdu chcete smazat task?`
                }
            }).then(()=> {
                showModal.value = true
            })
    }

    function closeModal () {
        resetModalSetup()
        showModal.value = false
    }

    function deleteTask (payload) {
        if(payload.conections.length) {
            payload.conections.forEach((conection) => {
                pinia.deletePersonstasks(conection.id)
            })
        }
        pinia.deleteTask(payload.taskid)
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
        modalSetup.value.dataForConfirm = []
    }


    // Methods
    function changeCompleted() {
        pinia.changeCompleted(props.task.id, props.task.completed).then(() => {
            emit('changeCompleted')
        })
    }
    function editTask (taskid) {
        router.push('/form-task/' + taskid)
    }
    function openDetail (taskid) {
        router.push('/task-detail/' + taskid)
    }
</script>


<style lang="scss" scoped>
@import '@/assets/base.scss';
.task-container {
    cursor: pointer;
    transition: all .3s linear;
    box-sizing:content-box;

    border-radius: 10px;
    padding: 0rem .3rem;
    &:hover {
        background: $gray
    }

    .task-body {
        display:flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        .header-area {
            display: flex;
            gap: .5rem;
            min-width: 200px;
            overflow: hidden;
            align-items: center;
        }
        .checkbox-area {
            display: flex;
            align-items: center;
        }
        .task-title-area {
            display: inline-block;
            align-items: center;
            gap: .5rem;
            overflow: hidden;
            text-overflow: ellipsis;
            text-wrap: nowrap;
            max-width: 200px;
        }
        .labels-area {
            display: flex;
            align-items: center;
            gap: 1rem;
            .persons-container{
                display: flex;
                .person-avatar {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: $black;
                    position: relative;
                    color: $white;
                    font-size: .7rem;
                    font-weight: bold;
                    width: 1.5rem;
                    height: 1.5rem;
                    border: .5px solid $black-lt;
                    border-radius: 100%;
                    box-shadow: 0 0 10px -5px black;
                    
                }
            }
            .label {
                cursor: default;
                color: $black-lt;
                font-size: .7rem;
                padding: .1rem .7rem;
                border-radius: 10px;
                text-wrap: nowrap;
            }
            .overdue {
                color: red;
              }
            .priority-label {
                text-align: center;
                width: 50px;
            }
            .project-label{
                width: 80px;
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }
    }
}
    .bordered {
        border: .5px solid $black-lt;
    }
    .pointer {
        cursor: pointer;
        padding: 0.3rem;
        border-radius: 5px;
        &:hover {
            background: $gray-dr;
        }
    }
    .red:hover {
        color: red;
    }
    .completed {
        text-decoration: line-through;
        color: $black-lt;
    }
    .low-priority{
        background: $green-lt;
    }
    .mid-priority{
        background: $yellow-lt;
    }
    .high-priority{
        background: $red-lt;
    }



</style>