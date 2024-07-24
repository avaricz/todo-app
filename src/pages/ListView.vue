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
    <div class="person-list-view-container">
        <PersonItem 
            v-for="(person, index) in personList"
            :key="`person ${index+1}`"
            :person-name="person.firstName + ' ' + person.lastName"
            :person-position="person.positionId"
            :number-of-tasks="person.taskId.length"
            />
            
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import ProjectItem from '@/components/ProjectItem.vue'
    import TodoItem from '@/components/TodoItem.vue'
    import PersonItem from '@/components/PersonItem.vue'
    import  { projects, tasks, persons, positions }  from '@/data/db.js'

    // POSITIONS
    const positionList = ref(positions)
    //console.log(positionList.value);

    // PERSONS
    const personList = ref(persons)

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
    .person-list-view-container {
        display: flex;
        flex-direction: column;
        padding: 2rem;
        gap: 1rem;

    }
</style>