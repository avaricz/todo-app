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
                size="small" 
                @click="console.log(e)" />

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
    import FormView from '@/layouts/FormView.vue';
    import DatePicker from 'primevue/datepicker';
    import InputText from 'primevue/inputtext';
    import { methods, paths } from '@/data/db';
    import Select from 'primevue/select';
    import Button from 'primevue/button';
    import { usePinia } from '@/store';
    import { computed,onMounted,ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router'

    const pinia = usePinia()
    const route = useRoute()
    const router = useRouter()
    const { allTasks } = paths

    // DATA
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
// -------------------------------------------------
//TODO
    onMounted(()=>{
        const index = route.params.id ? pinia.getTaskById(route.params.id) : ""
    })

    const data = ref({
        task: "",
        projectid: "",
        completed: 0,
        date: "",
        priority: 0,
        
    })

// ---------------------------------------------------------
    // Send data to database
    function onSubmit () {
        methods.post(allTasks, data.value).then(() => {
            router.back()
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