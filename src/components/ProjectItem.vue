<template>

    <div
    class="project-container"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
    
    >

        <div
        class="project-header"
        >
            <div class="project-title-area">
                <div 
                class="project-name"
                >
                {{ project.project }} 
                <span>detail</span>
                </div>
                <div 
                v-if="isMouseOver || show"
                class="icons-area">
                    <i class="pi pi-cog pointer" @click.stop="onClickEdit"></i>
                    <i class="pi pi-trash pointer red" @click.stop="onClickDelete"></i>
                </div>
            </div>
                
            <div class="arrow-area" @click="onClickArrow">
                <img src="@/img/icons/arrow-down.svg" alt="" :class="{opened: show}">
            </div>
        </div>

            <template v-if="show">
                <div class="project-description">{{ project.description }}</div>

                <template v-if="tasksList" >
                    <div class="tasks-wrapper">
                        <ul>
                            <TaskItem 
                                v-for="(task, index) in tasksList"
                                :key="`task ${index+1}`"
                                :task="task"
                                :persons="personsByTask(task.id)"
                                :show-project="false"
                                @change-completed="fetch(project.id)"
                            />
                        </ul>
                        
                    </div> 
                </template>

                <div class="project-footer">
                    <div class="persons-area">
                        <img src="@/img/icons/persons.svg" alt="">
                        {{ people }}
                    </div>
                    <div class="deadline-area">
                        <img src="@/img/icons/calendar.svg" alt="">
                        {{ deadline }}
                    </div>
                </div>

            </template>

    </div>    

</template>

<script setup>
import TaskItem from './TaskItem.vue';
import { useRouter } from 'vue-router';
import { usePinia } from '@/store';
import { ref } from 'vue';

    const props = defineProps({
        project: {
            type: Object,
            required: true
        },
        show: Boolean,
        people: Number,
        deadline: String, //TODO změnit props na Date
        tasksList: Array
    })
    const router = useRouter()
    const pinia = usePinia()
    const emit = defineEmits(['clicked', 'clicked-delete'])

    // Data
    const isMouseOver = ref(false)
    const personsByTask = (taskid) => {
        const filtered = pinia.personsTasks.filter(obj => {
            if(obj.taskid == taskid){
                return obj
            }
        })
        return filtered.map(obj => {
            const person = {
                id: obj.personid,
                initials: obj.first[0] + obj.last[0]
            }
            return person
        })
    }
   
    // Methods
    function mouseOver () {
        isMouseOver.value = true
    }
    function mouseLeave () {
        isMouseOver.value = false
    }
    function onClickEdit () {
        router.push(`form-project/${props.project.id}`)
    }
    function onClickDelete () {
        emit('clicked-delete')
        //pinia.deleteProject(props.project.id)
    }
    function onClickArrow () {
        emit('clicked')
    }
    function fetch(projectid) { 
        pinia.fetchTasksByProjects(projectid)

    }

</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';
.project-container {
    background: white;

    display: flex;
    flex-direction: column;
    gap: .8rem;

    border: .5px solid $black-lt;
    border-radius: 10px;

    padding: 1rem;
    min-width: 500px;
}
.project-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    .project-title-area {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 28px;
        .project-name {
            cursor: pointer;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: bold;
            font-size: 1.4rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            &:hover{
                span{
                    display: block;
                }
            }
        }
        .icons-area {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        span {
            display: none;
            font-size: .8rem;
            color: $black-lt;
            background: $gray;
            padding: .2rem .7rem;
            border-radius: 50px;
        }
    } 
    .arrow-area {
        display: flex;
        align-items: center;
        cursor: pointer;
        img {
            height: 1rem;
            transition: all .3s linear;
        }
    }
}
.project-description {
    padding-left: 1rem;
    color: $black-lt;
}
.tasks-wrapper {
    ul {
        list-style-type: none;
        padding: 1rem 0 1rem 2rem;
    }
}
.project-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .persons-area, .deadline-area {
        display: flex;
        align-items: center;
        gap: .5rem;
        img {
            height: 1rem;
        }
    }
}
.opened {
    transform: rotateX(180deg);
}
.pointer {
    cursor: pointer;
    padding: 0.3rem;
    border-radius: 5px;
    &:hover {
        background: $gray;
    }
}
.red{
    &:hover {
        color: red;
    }
}
</style>