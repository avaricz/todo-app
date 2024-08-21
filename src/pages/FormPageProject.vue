<template>

        <FormView>
            <form   class="form">
                
                <InputText
                 v-model="data.project"
                 placeholder="New project"
                 />
                <Textarea v-model="data.description" autoResize rows="5" cols="30" />
                <Button :label="buttonLabel"  @click="onSubmit"/>
            </form>
        </FormView>

</template>

<script setup>
import FormView from '@/layouts/FormView.vue';
import { methods, paths } from '@/data/db';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import { useRouter, useRoute } from 'vue-router';
import Button from 'primevue/button';
import { usePinia } from '@/store';
import {ref} from 'vue'

const { allProjects } = paths
const { post } = methods
const route = useRoute()
const router = useRouter()
const pinia = usePinia()

// DATA
const data = ref({
        project: "",
        description: ""        
    })

    const buttonLabel = ref(route.params.id ? "Edit project" : "Create project")

// Methods
function onSubmit () {
    post(allProjects, data.value).then(() => {
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
    max-width: 500px
}
</style>