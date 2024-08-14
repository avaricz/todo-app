<template>
    <ListView>
        <TaskItem 
                v-for="(task, index) in taskList"
                :key="`task ${index+1}`"
                :task="task"
                :show="taskSettings[index].isTaskDetailOpened"
                @clicked="onClickedTask(index)"
                @delete="deleteTask(task.id)"
                @edit="editTask(task.id)"
            />
    </ListView>
</template>

<script setup>
    import TaskItem from '@/components/TaskItem.vue'
    import ListView from '@/layouts/ListView.vue';
    import { computed, onMounted } from 'vue'
    import { usePinia } from '@/store';
    import { methods, paths } from '@/data/db';
    import { useRouter } from 'vue-router';

    const pinia = usePinia()
    const router = useRouter()

    // Data
    const taskList = computed(() => pinia.tasks)
    const taskSettings = computed(() => taskList.value.map(() => ({isMouseOver: false, isTaskDetailOpened: false })))

    // Methods
    function onClickedTask (index) {
        taskSettings.value[index].isTaskDetailOpened = !taskSettings.value[index].isTaskDetailOpened
    }
    function deleteTask (taskid) {
        methods.delete(paths.allTasks, taskid).then(() => {
            pinia.fetchTasks()
            pinia.fetchProjects()
        })
    } 
    function editTask (taskid) {
        router.push('/form-task/' + taskid)
    }

    // Lifecycle hooks
    onMounted(() => {
        pinia.fetchTasks()
    })
</script>
