<template>
    <ListView>
        <TaskItem 
                v-for="(task, index) in taskList"
                :key="`task ${index+1}`"
                :task="task"
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

    // Lifecycle hooks
    onMounted(() => {
        pinia.fetchTasks()
    })
</script>
