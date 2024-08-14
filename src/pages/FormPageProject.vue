<template>

        <FormView>
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
import SubmitButton from '@/components/form/StandardButton.vue';
import InputTextarea from '@/components/form/InputTextarea.vue';
import InputText from '@/components/form/InputText.vue';
import FormView from '@/layouts/FormView.vue'
import { methods, paths } from '@/data/db'
import { useRouter } from 'vue-router';
import {ref} from 'vue'
import { usePinia } from '@/store';

const router = useRouter()
const pinia = usePinia()

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

// Methods
function onSubmit () {
    const { allProjects } = paths
    const newProjectBody = {
        project: formSettings.value.projectName.inputValue,
        description: formSettings.value.projectDescription.inputValue
    }
    methods.post(allProjects, newProjectBody).then(() => {
        pinia.fetchProjects()
        router.push('/projects')
    })

  
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