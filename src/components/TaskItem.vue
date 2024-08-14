<template>
    <div class="task-container">
        <div class="task-body"> 
            <div class="header-area">   
                <div class="checkbox-area">{{task.completed}}</div> 
                <div class="task-title-area">
                    {{ task.task }} 
                </div>
            </div>
            <div class="labels-area">
                <span
                 class="label priority-label" 
                 :class="getPriorityClass(task.priority)"
                 >{{ priorityLabels[task.priority-1] }}</span>
                <span class="label project-label bordered">{{ task.project }}</span>
                <span class="label">{{ task.date }}</span>
                <i class="pi pi-cog pointer" @click="$emit('edit')"></i>

                <i class="pi pi-times-circle pointer red" @click="$emit('delete')"></i>
                
            </div>
        </div>   
    </div>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
    task: {
        type: Object,
        required: true,
    }
 })

const priorityLabels = ref(['low', 'mid', 'high'])

const getPriorityClass = (priority) => {
    return priorityLabels.value[priority-1] + '-priority'
}


 const checked = computed(() => {
    let status;
    task.completed === 0 ? status = false : status = true
    console.log(status)
    return status
 })

 
</script>


<style lang="scss" scoped>
@import '@/assets/base.scss';
.task-container {
    transition: all .3s linear;
    box-sizing:content-box;

    border-radius: 10px;
    padding: .5rem .3rem;

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
        }
        .checkbox-area {
            background: lightgray;
        }
        .task-title-area {
            display: inline-block;
            align-items: center;
            gap: .5rem;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .labels-area {
            display: flex;
            align-items: center;
            gap: 1rem;
            .label {
                cursor: default;
                color: $black-lt;
                font-size: .7rem;
                padding: .1rem .7rem;
                border-radius: 10px;
                text-wrap: nowrap;
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
                background: $gray;
            }
        }
    }
}
    .bordered {
        border: .5px solid $black-lt;
    }
    .pointer {
        cursor: pointer;
        padding: .3rem;
        border-radius: 5px;
        &:hover {
            background: $gray;
        }
    }
    .red:hover {
        color: red;
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