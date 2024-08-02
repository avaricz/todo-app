<template>
    <div class="form-container">

        <h2>Form page</h2>

        <h3>Project form</h3>
        <form v-if="$route.path === '/form-project'"  @submit.prevent="onSubmit">
            
            <label for="project-name">Project Name</label>
            <InputText 
            :settings="project"
            />
            <label for="project-desc">Project Description</label>
            <InputTextarea 
            :settings="textarea"
            />
            <button type="submit">Create project</button>
        </form>

    </div>
</template>

<script setup>
import {ref} from 'vue'
import InputText from '@/components/form/InputText.vue';
import InputTextarea from '@/components/form/InputTextarea.vue';
import { methods, paths } from '@/data/db';

const project = ref({
    control: 'project-name',
    inputValue:'',
    placeholder:"Enter project name"
})
const textarea = ref({
    control: 'project-desc',
    inputValue:'',
    placeholder:"Enter project description"
})

const { allProjects } = paths

// Odesle data do databaye
const onSubmit = () => {
    methods.post(allProjects, {
        project: project.value.inputValue, 
        description: textarea.value.inputValue
    })
}

</script>

<style lang="scss" scoped>
.form-container {
    padding: 1rem;
}
form {
    display: flex;
    flex-direction: column;
}
</style>