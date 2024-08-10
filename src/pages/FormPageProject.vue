<template>

        <FormView #project-form>
            <form  @submit.prevent="onSubmit" class="form">
                
                <InputText :settings="formSettings.projectName" />

                <InputTextarea :settings="formSettings.projectDescription" />

                <div class="btn-container">
                    <SubmitButton 
                    :label="formSettings.button.label"
                    :type="formSettings.button.type"/>
                </div>
            </form>
        </FormView>

</template>

<script setup>
import {ref} from 'vue'
import FormView from '@/layouts/FormView.vue'
import InputText from '@/components/form/InputText.vue';
import InputTextarea from '@/components/form/InputTextarea.vue';
import SubmitButton from '@/components/form/StandardButton.vue';
import { methods, paths } from '@/data/db'

const formSettings = ref({
    projectName: {
        id: "project-name",
        placeholder: "Enter project name",
        inputValue: "",
        maxlength: 255
    },
    projectDescription: {
        id: "project-description",
        placeholder: "Enter project description",
        inputValue: "",
        rows: 3
    },
    button: {
        label: "Create project",
        type: "submit"
    }
})

// Odesle data do databaze
const onSubmit = () => {
    const { allProjects } = paths
    const newProjectBody = {
        project: formSettings.value.projectName.inputValue,
        description: formSettings.value.projectDescription.inputValue
    }
        
    methods.post(allProjects, newProjectBody)
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
}


.btn-container {
    display: flex;
    justify-content: end;
}
</style>