<template>
    <div class="position-form">
        <InputText 
        style="background: inherit;"
        size="small"
        type="text"
        fluid
        v-model="positionValue"
        />
        <div class="icons">
            <i
            class="pi pi-check pointer green"
            @click="createPosition"
            ></i>

            <i 
            class="pi pi-times pointer red"
            @click="clearInput"
            ></i>
        </div>
    </div>
</template>

<script setup>
    import InputText from 'primevue/inputtext';
    import { methods, paths} from '@/data/db'
    import { ref } from 'vue'
    import { usePinia } from '@/store'

    const { post, put } = methods
    const { allPositions } = paths
    const pinia = usePinia()

    const props = defineProps({
        position: {
            type: Object
        },
        editMode:{
            type: Boolean
        }
         
    })


    const emit = defineEmits(['cancelEdit'])
    const positionValue = ref(props.position.position)


    function createPosition() {
        if(props.editMode){
            console.log(positionValue.value)
            const data = {id: props.position.id, position: positionValue.value}
            console.log(`${allPositions}/${props.position.id}`, data);
            
            put(allPositions, props.position.id, data).then(() => {
            pinia.fetchPositions()
            })
        }
        if(!props.editMode){
            console.log('daty post')

            post(allPositions, positionValue.value).then(() => {
                pinia.fetchPositions()
            })
        }
        clearInput()
    }

    function clearInput() {
        positionValue.value = ""
        emit('cancelEdit')
    }

</script>

<style lang="scss" scoped>
.position-form{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap:1rem
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