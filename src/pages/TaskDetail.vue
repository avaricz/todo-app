<template>
    <FormView>
        <div class="container">

            <div class="title-area">
                <h3>{{ task.task }}</h3>
            </div>
            <div class="details-area">

                <div class="detail-row">
                    <div>Project: </div>
                    <div>{{ task.project }}</div>
                </div>

                <div class="detail-row">
                    <div>Priority: </div>
                    <div>{{ task.priority }}</div>
                </div>

                <div class="detail-row">
                    <div>Date: </div>
                    <div>{{ task.date }}</div>
                </div>

            </div>

            <div class="persons-area">
                <div>Persons: </div>
                <div class="persons-wrapper">
                    <ul>
                        <li 
                        v-for="person in personsByTask">
                            {{ person.first + " " + person.last }}
                            <i class="pi pi-times-circle pointer red" @click="discardPerson(person.id)"></i>
                        </li>
                    </ul>
                </div>

                
            </div>
            <div class="select-wrapper">

                <Select
                :options="personsForSelect"
                option-label="name"
                option-value="id"
                v-model="selectedPerson"
                placeholder="add person"
                style="width: 80%"
                ></Select>

                <div class="icons">

                    <i class="pi pi-check pointer green" @click="confirmPerson"></i>
                    <i class="pi pi-times pointer red" @click="clearInput"></i>

                </div>

            </div>

        </div>
    </FormView>
</template>

<script setup>
    import { onMounted, ref, computed } from 'vue';
    import FormView from '@/layouts/FormView.vue';
    import { methods, paths } from '@/data/db';
    import { useRoute } from 'vue-router';
    import Select from 'primevue/select';
    import { usePinia } from '@/store';

    const route = useRoute()
    const pinia = usePinia()
    const { post } = methods
    const { allPersonstasks } = paths

    //Data
    const task = ref({
      task: "",
      project: "",
      completed: 0,
      date: "",
      priority: "",
      projectid:"",
    })

    const selectedPerson = ref(null)

    const personsByTask = computed(() => {
        return pinia.personsTasks.filter(obj => {
            if (obj.taskid == route.params.id){
                return obj
            }
        })
    })

    const personsForSelect = computed(() => {
        return pinia.persons.map(obj => {
            const person = {
                id: obj.id,
                name: obj.first + " " + obj.last
            }
            return  person
        })
    })



    //Methods
    function discardPerson(recordid) {
        pinia.deletePersonstasks(recordid)
    }
    function confirmPerson () {
        const body = {
            taskid: route.params.id,
            personid: selectedPerson.value
        }
        post(allPersonstasks, body)
        .then(() => {
            pinia.fetchPersonsTasks()
            selectedPerson.value = null
        })
    }
    function clearInput () {
        selectedPerson.value = null
    }

    //Lifecycle hooks
    onMounted(() =>{
        pinia.getTaskById(route.params.id).then(data =>{
            task.value = data
        })
        pinia.fetchPersonsTasks()
        pinia.fetchPersons()
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
    .title-area {
        padding: .5rem ;
        border-bottom: .5px solid $black-lt;
    }
    h3 {
        color: $black
    }
    .details-area {
        display: flex;
        flex-direction: column;
        gap: .5rem;
        padding: 0 1rem;
        .detail-row {
            border-bottom: .5px solid $gray-dr;
            display: flex;
            :first-child {
                width: 80px;
                color: $black-lt;
            }
            :last-child {
                font-weight: bold;
            }
        }
    }
    .persons-area {
        display: flex;
        padding: 0 1rem;
        color: $black-lt;
        div:first-of-type{
            width: 80px;
        }
        .persons-wrapper {
            color: $black;
            ul {
                list-style-type: none;
                padding: 0;
                li{
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    font-weight: bold;
                }
            }
        }
    }
    .select-wrapper{
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        .icons {
            display: flex;
            align-items: center;
            gap: .5rem;
        }
    }
}
.pointer {
    cursor: pointer;
    padding: .3rem;
}
.red {
    &:hover {
        color: red;
    }
}
.green {
    &:hover {
        color: green
    }
}

</style>