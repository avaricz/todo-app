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
    import { useRouter, useRoute } from 'vue-router';
    import FormView from '@/layouts/FormView.vue';
    import {onMounted, ref, computed} from 'vue';
    import { methods, paths } from '@/data/db';
    import InputText from 'primevue/inputtext';
    import Textarea from 'primevue/textarea';
    import Button from 'primevue/button';
    import { usePinia } from '@/store';

    const { allProjects } = paths
    const { post, put } = methods
    const route = useRoute()
    const router = useRouter()
    const pinia = usePinia()

    // DATA
    const data = ref({
            project: "",
            description: ""        
        })

    const buttonLabel = ref(route.params.id ? "Edit project" : "Create project")

    const isEdit = computed(()=> !!route.params.id)

    // Methods
    function onSubmit () {
        if(isEdit.value){
            put(allProjects, route.params.id, data.value).then(()=>{
                router.back()
            })
            return
        }
        post(allProjects, data.value).then(() => {
            pinia.fetchProjects()
            router.push('/projects')
        })
    }
    //Lifecycle hooks
    onMounted(()=> {
        if(isEdit.value){
            pinia.getProjectById(route.params.id).then(project => {
                data.value.project = project.project
                data.value.description = project.description
            })
        }
    })
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