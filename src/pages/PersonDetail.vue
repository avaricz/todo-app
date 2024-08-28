<template>
    <FormView>
        <div class="container">

            <h2>{{ person.first + " " + person.last }}</h2>
            <h3>{{ person.position }}</h3>

            <div class="info"
            :class="{yellow: !personTasksList.length}"
            v-if="!personTasksList.length">
                <p>This user currently has no task assigned</p>
            </div>

            <div class="tasks" v-if="personTasksList.length">
                <ul>
                    <li
                    class="task-li"
                    v-for="task in personTasksList">
                        <div>
                        {{ task.task }}
                        </div>
                        <div class="delete-button">
                            <i class="pi pi-times-circle pointer red" @click="removeTask(task.id)"></i>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="select-wrapper">

                <Select
                :options="tasks"
                v-model="persontask"
                placeholder="select task"
                optionValue="id"
                optionLabel="name"
                style="width: 80%"
                ></Select>

                <div class="icons">

                    <i class="pi pi-check pointer green" @click="confirmTask"></i>
                    <i class="pi pi-times pointer red" @click="clearInput"></i>

                </div>

            </div>

        </div>
    </FormView>
</template>

<script setup>
    import { computed, onMounted, onUnmounted, ref } from 'vue';
    import FormView from '@/layouts/FormView.vue';
    import { useRoute } from 'vue-router';
    import Select from 'primevue/select';
    import { usePinia } from '@/store';
    import { methods, paths} from '@/data/db';

    const route = useRoute()
    const pinia = usePinia()
    const { allPersonstasks } = paths
    const { post, delete:del } = methods

    //Data
    const person = ref({
        first: "",
        last: "",
        position: ""
    })

    const personTasksList = computed(() => {
        return pinia.personsTasks.filter(obj => {
            return obj.personid == route.params.id
        })
    })

    const persontask = ref(null)

    const tasks = computed(()=>{
        return pinia.tasks.map(obj => {
            const {id, task: name} = obj
            return  {id, name}
        })
    })

    //Methods
    function confirmTask () {
        const body = {
            personid: route.params.id,
            taskid: persontask.value
        }
        console.log(allPersonstasks,body)
        post(allPersonstasks, body)
        .then(() => {
            pinia.fetchPersonsTasks()
        }).then(() => {
            persontask.value = pinia.personsTasks
        })
    }
    function clearInput () {
        persontask.value = null
        console.log(personTasksList.value)
    }
    function removeTask(recordid) {
        del(allPersonstasks, recordid)
        .then(()=> {
            pinia.fetchPersonsTasks().then(() => {
            persontask.value = pinia.personsTasks
        })
        })
    }

    //Lifecycle hooks
    onMounted(() =>{
        pinia.getPersonById(route.params.id).then(data =>{
            person.value = data
        })
        pinia.fetchTasks()
        pinia.fetchPersonsTasks().then(() => {
            persontask.value = pinia.personsTasks
        })
    })
    onUnmounted(() => {    
        pinia.personDetail = null
    })

</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';
.container {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    border-radius: 10px;
    box-shadow: 0 0 5px -1px $black-lt;

    padding: 1rem;
    max-width: 500px;
    h2,h3 {
        text-align: center;
    }
    h2 {
        font-weight: bold;
    }
    h3 {
        color: $black-lt
    }
}
.info {
    display: flex;
    align-items: center;
    justify-content: center;
    font-style: italic;
    font-size: .8rem;
    height: 2rem;
    padding: .3rem;
}
.tasks {
    background: $gray;
    border-radius: 10px;
    padding: .2rem .7rem;
    ul {
        display: flex;
        flex-direction: column;
        gap: .3rem;
        padding: 0;
        list-style-type: none;
    }
}
.task-li {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.delete-button {
    border: .5px solid $gray-dr;
    border-radius: 5px;
    &:hover {
        background: $gray-dr;
    }
}
.select-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}
.yellow {
    background: $yellow-lt;
}
.icons {
    display: flex;
    align-items: center;
    gap: .5rem;
}

.pointer{
    cursor: pointer;
    padding: .3rem;
}
.red {
    &:hover {
        color: red
    }
}
.green {
    &:hover {
        color: green
    }
}


</style>