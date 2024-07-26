<template>
    <ListView #tasks>
        <TodoItem 
                v-for="(task, index) in taskList"
                :key="`task ${index+1}`"
                :title="task.title"
                :content="task.content"
                :priorityLabel="'priority'"
                :show="taskSettings[index].isTaskDetailOpened"
                :isMouseOver="taskSettings[index].isMouseOver"
                @under-mouse="taskSettings[index].isMouseOver = true"
                @not-mouse="taskSettings[index].isMouseOver = false"
                @clicked="onClickedTask(index)"
            />
    </ListView>
</template>

<script setup>
    import { ref } from 'vue'
    import TodoItem from '@/components/TodoItem.vue'
    import ListView from '@/layouts/ListView.vue';
    import  { tasks }  from '@/data/db.js'

    const taskList = ref(tasks)
    const taskSettings = ref(taskList.value.map(task => {
        return {isMouseOver: false, isTaskDetailOpened: false}
    }))
    const onClickedTask = (index) => {
        taskSettings.value[index].isTaskDetailOpened = !taskSettings.value[index].isTaskDetailOpened
    }
</script>
