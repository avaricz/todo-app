<template>

    <FormView #task-form>

        <form class="form" >
   
            <InputText 
            v-model="data.task" 
            placeholder="New task"/>
<div>
            <Select  style="width: 33%"
            v-model="data.projectid" 
            :options="projectsList" 
            optionValue="id" 
            optionLabel="name" 
            placeholder="Projects" 
            class="w-full md:w-56" 
            size="small" 
            @click="console.log(e)"/>

            <Select  style="width: 33%"
            v-model="data.priority"
            :options="priorityList"
            optionLabel="name"
            optionValue="id"
            placeholder="Priority"
            class="w-full md:w-56"
            size="small" />


            <DatePicker style="width: 33%"
            v-model="data.date"  
            size="small"
            />
</div> 
            <Button label="Add Task"  @click="onSubmit"/>
                
        </form>

    </FormView>
</template>

<script setup>
import {ref} from 'vue'
import InputText from 'primevue/inputtext';
import Select from 'primevue/select';
import DatePicker from 'primevue/datepicker';
import Button from 'primevue/button';
import FormView from '@/layouts/FormView.vue'
import { methods, paths } from '@/data/db'

// DATA
const allProjectsData = await methods.get(paths.allProjects)

const projectsList = ref(allProjectsData.map(obj => {
    const {id, project: name} = obj
    return  {id, name}
}))

const priorityList = ref([
    { id: 1, name: "low" },
    { id: 2, name: "mid" },
    { id: 3, name: "high" }
])

const data = ref({
    task: "",
    projectid: "",
    completed: 0,
    date: "",
    priority: 0,

})

// CONFIGURATION
const formSettings = ref({
    task: {
        id: "task-name",
        placeholder: "New task",
        inputValue: "",
        maxlength: 255
    },
    selectProject: {
        id: "project-select",
        placeholder: "project",
        showIcon:true,
        inputValue: "",
        icon: "src/img/icons/project-folder.svg"
    },
    selectPriority: {
        id: "priority-select",
        showIcon: true,
        inputValue: "",
        placeholder: "priority",
        icon: "src/img/icons/priority.svg"
    },
    date: {
        id: "date-picker",
        inputValue: "",
        placeholder: "dd.mm.yyyy"
    },
    
    button: {
        label: "Create task",
        type: "submit"
    }
})



// Select option from inputSelect
const onSelectProject = (payload) => {
    data.value.projectid = payload.id
}

const onSelectPriority = (payload) => {
    data.value.priority = payload.id
}

// Send data to database
const onSubmit = () => {
    console.log(data.value)
    methods.post(paths.allTasks, data.value)
}
</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';
.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 10px;
    box-shadow: 0 0 5px -1px $black-lt;
    padding: 1rem;
    max-width: 500px
}

.task-setup-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.label {
    text-align: center;
    background: $gray;
    border-radius:  5px;
    width: 100px;
}
</style>