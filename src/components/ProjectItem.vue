<template>

    <div class="project-container">

        <div class="project-header">
            <div class="project-name">{{ project.project }} 
                <span>details</span><!-- TODO - po kliknutí na Name otevřít kompletní detail projektu se všemi členy, todos, atd.. -->
                <i class="pi pi-cog" @click="onClickEdit"></i>
                <i class="pi pi-trash" @click="onClickDelete"></i>
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
                                :show-project="false"
                                @change-completed="fetch"
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
    const emit = defineEmits(['clicked'])

    // Methods
    function onClickEdit () {
        router.push(`form-project/${props.project.id}`)
    }
    function onClickDelete () {
        pinia.deleteProject(props.project.id)
    }
    function onClickArrow () {
        emit('clicked')
    }
    function fetch() {
        pinia.fetchTasksByProjects(13)
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
}
.project-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .project-name {
        display: flex;
        align-items: center;

        font-size: 1.4rem;
        font-weight: bold;

        cursor: pointer;
        span {
            display: block;
            font-size: .8rem;
            color: $black-lt;
            background: $gray;
            padding: .3rem .7rem;
            border-radius: 50px;
            margin-left: 1rem;
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




</style>