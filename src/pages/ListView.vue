<template>
    
    <div class="list-view-container">
        <ProjectItem 
        v-for="(project, index) in projectList"
        :key="`project ${index+1}`"
        :name="project.project"
        :description="project.description"
        :people="project.people.length"
        :deadline="'2024-01-10'"
        @clicked="onClickedProject(index)"
        :show="isProjectDetailOpened[index]"
        /> 

        
 
    </div>
    <div class="todo-list-view-container">
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
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import ProjectItem from '@/components/ProjectItem.vue'
    import TodoItem from '@/components/TodoItem.vue'
    import  { projects, tasks }  from '@/data/db.js'

    // TASKS
    const taskList = ref(tasks)
    const taskSettings = ref(taskList.value.map(task => {
        return {isMouseOver: false, isTaskDetailOpened: false}
    }))
    const onClickedTask = (index) => {
        taskSettings.value[index].isTaskDetailOpened = !taskSettings.value[index].isTaskDetailOpened
    }
    

    // PROJECTS
    const projectList = ref(projects)
    
    const isProjectDetailOpened = ref(projectList.value.map(project => false))

    const onClickedProject = (index) => {
        isProjectDetailOpened.value[index] = !isProjectDetailOpened.value[index]
    }

</script>

<style lang="scss" scoped>
    @import '@/assets/base.scss';
    .list-view-container {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem;
    }
    .todo-list-view-container {
        display: flex;
        flex-direction: column;
        padding: 2rem;
        gap: 2px;
        background: white;
    }
</style>