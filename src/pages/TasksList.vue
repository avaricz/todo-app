<template>
    <ListView #tasks>
        <TaskItem 
                v-for="(task, index) in taskList"
                :key="`task ${index+1}`"
                :title="task.task"
                :priorityLabel="task.priority"
                :show="taskSettings[index].isTaskDetailOpened"
                :isMouseOver="taskSettings[index].isMouseOver"
                @under-mouse="taskSettings[index].isMouseOver = true"
                @not-mouse="taskSettings[index].isMouseOver = false"
                @clicked="onClickedTask(index)"
            />
    </ListView>
</template>

<script setup>
    import TaskItem from '@/components/TaskItem.vue'
    import ListView from '@/layouts/ListView.vue';
    import { usePinia } from '@/store';
    import {  computed, onMounted } from 'vue'

    const pinia = usePinia()

    // Data
    const taskList = computed(() => pinia.tasks)
    const taskSettings = computed(() => taskList.value.map(() => ({isMouseOver: false, isTaskDetailOpened: false })))

    // Methods
    const onClickedTask = (index) => {
        taskSettings.value[index].isTaskDetailOpened = !taskSettings.value[index].isTaskDetailOpened
    }

    // Lifecycle hooks
    onMounted(() => {
        pinia.fetchTasks()
    })
</script>
