<template>
    <ListView>
        <TaskItem 
                v-for="(task, index) in taskList"
                :key="`task ${index+1}`"
                :task="task"
                :persons="personsByTask(task.id)"
            />
    </ListView>
</template>

<script setup>
    import TaskItem from '@/components/TaskItem.vue'
    import ListView from '@/layouts/ListView.vue';
    import { computed, onMounted } from 'vue'
    import { usePinia } from '@/store';

    const pinia = usePinia()

    // Data
    const taskList = computed(() => pinia.tasks)
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
    
    // Lifecycle hooks
    onMounted(() => {
        pinia.fetchTasks()
        pinia.fetchPersonsTasks()
    })
</script>