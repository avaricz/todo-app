<template>

    <FormView>
        <form class="form">

            <InputText 
            v-model="data.first" 
            placeholder="First name"
            />

            <InputText
            v-model="data.last"
            placeholder="Last name" 
            />

            <Select
            v-model="data.positionid" 
            :options="positionList" 
            optionValue="id" 
            optionLabel="name" 
            placeholder="Positions" 
            class="w-full md:w-56"
            ></Select>

            <Button
            :label="buttonLabel"
            @click="onSubmit"
            ></Button>
        </form>
    </FormView>

</template>

<script setup>
    import { useRoute, useRouter } from 'vue-router';
    import { onMounted, ref, computed} from 'vue';
    import FormView from '@/layouts/FormView.vue';
    import InputText from 'primevue/inputtext';
    import { methods, paths} from '@/data/db';
    import Select from 'primevue/select';
    import Button from 'primevue/button';
    import { usePinia } from '@/store';

    const pinia = usePinia()
    const route = useRoute()
    const router = useRouter()
    const { post, put } = methods
    const { allPersons } = paths

    // DATA
    const data = ref({
            first: "",
            last: "",
            positionid: null,        
        })
    const buttonLabel = ref(route.params.id ? "Edit person" : "Create person")

    const positionList = computed(()=> {
        return pinia.positions.map(obj => {
            const {id, position:name} = obj
            return {id, name}
        })
    })
    const isEdit = computed(()=> !!route.params.id)
    // Methods
    function onSubmit () {
        console.log(data.value)
        if(isEdit.value){
            put(allPersons, route.params.id, data.value).then(() => {
                router.back()
            })
            return
        }
        post(allPersons, data.value).then(()=> router.back()).then(()=> {
            router.back()
            pinia.fetchProjects()
        })
    }
    // Lifecycle hooks
    onMounted(()=> {
        pinia.fetchPositions()
        if(isEdit.value) {

            pinia.getPersonById(route.params.id).then((person) => {
                data.value.first = person.first
                data.value.last = person.last
                data.value.positionid = person.positionid
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
    max-width: 500px;
}
</style>