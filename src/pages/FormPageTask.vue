<template>
    <FormView>

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
                ></Select>

                <Select  style="width: 33%"
                v-model="data.priority"
                :options="priorityList"
                optionLabel="name"
                optionValue="id"
                placeholder="Priority"
                class="w-full md:w-56"
                ></Select>


                <DatePicker style="width: 33%"
                v-model="data.date"  
                />
            </div> 
            <Button
            :label="buttonLabel"
            @click="onSubmit"
            ></Button>
                
        </form>

    </FormView>
</template>

<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import FormView from '@/layouts/FormView.vue';
    import DatePicker from 'primevue/datepicker';
    import { computed,onMounted,ref } from 'vue';
    import InputText from 'primevue/inputtext';
    import { methods, paths } from '@/data/db';
    import Select from 'primevue/select';
    import Button from 'primevue/button';
    import { usePinia } from '@/store';

    const pinia = usePinia()
    const route = useRoute()
    const router = useRouter()
    const { allTasks } = paths
    const { put, post } = methods

    // DATA
    const data = ref({
        task: "",
        projectid: "",
        completed: 0,
        date: "",
        priority: 0,
        
    })
    const projectsList = computed(() => {
       return pinia.projects.map(obj => {
            const {id, project: name} = obj
            return  {id, name}
        })
    })
    const priorityList = ref([
        { id: 1, name: "low" },
        { id: 2, name: "mid" },
        { id: 3, name: "high" }
    ])
    const buttonLabel = ref(route.params.id ? "Edit task" : "Create task")
    const isEdit = computed(() => !!route.params.id)

    // Methods
    function onSubmit () {
        if (isEdit.value){
            put(allTasks,route.params.id, data.value).then(() => {
                router.back()
            })
            return
        }
        post(allTasks, data.value).then(() => {
            pinia.fetchProjects()
            router.back()
        })
    }
    //LifeCycle hooks
    onMounted(()=>{
        if(isEdit.value){
            pinia.getTaskById(route.params.id).then(() =>{
            data.value.task = pinia.singleTask.task
            data.value.projectid = pinia.singleTask.projectid
            data.value.date = pinia.singleTask.date
            data.value.priority = pinia.singleTask.priority
            data.value.completed = pinia.singleTask.completed
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