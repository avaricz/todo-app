<template>
    <ListView>
        <TaskItem 
                v-for="(task, index) in taskList"
                :key="`task ${index+1}`"
                :task="task"
                :show="taskSettings[index].isTaskDetailOpened"
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
    function deleteTask (taskid) {
        deleteTask(taskid)
    } 
    function editTask (taskid) {
        router.push('/form-task/' + taskid)
    }

    // Lifecycle hooks
    onMounted(() => {
        pinia.fetchTasks()
    })
</script>
