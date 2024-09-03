<template>

    <div class="person-container" @click.stop="clickOnContainer">
        <div class="avatar"> {{ initials }}</div>
        <div class="info-area">
            <div class="name-area"> {{ person.first + " " + person.last }} </div>
            
            <div class="position-area"> {{ person.position }} </div>
        </div>

        <div class="icons-area">
            <i class="pi pi-user-edit pointer"
            @click.stop="editPerson"
            ></i>
            <i
            class="pi pi-times-circle pointer red"
            @click.stop="openModal(person.id)"
            ></i>
        </div>
    </div>
    <DefaultModal
        v-if="showModal"
        :msg="modalSetup.contentMsg"
        :header="modalSetup.header"
        :data="modalSetup.dataForConfirm"
        :cancel-btn="modalSetup.cancelBtn"
        :confirm-btn="modalSetup.confirmBtn"
        :cancel-label="modalSetup.cancelLabel"
        :confirm-label="modalSetup.confirmLabel"
        @close-me="closeModal"
        @cancel="closeModal"
        @confirm="deletePerson" />

</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { usePinia } from '@/store';
    import { ref } from 'vue'
import DefaultModal from './DefaultModal.vue';

    const pinia = usePinia()
    const router = useRouter()

    const props = defineProps({
        person: {
            type: Object,
            required: true,
        },
        numberOfTasks: {
            type: Number,
            required: true,
        },
        overdueLabel: {
            type: String,
            default: "overdue"
        }
    })

    const emit = defineEmits(['container-clicked'])

    const initials = ref(props.person.first[0].toUpperCase() + props.person.last[0].toUpperCase())

    // Modal
    const showModal = ref(false)

    const modalSetup = ref({
        header: '',
        contentMsg: '',
        cancelBtn: false,
        confirmBtn: false,
        cancelLabel: '',
        confirmLabel: '',
        dataForConfirm: {},
    })

    function openModal (id) {
        console.log(id)
        modalSetup.value.dataForConfirm.personid = id

        pinia.fetchPersonsTasks().then( data => {
            const conections = data.filter(conection => {
                if (conection.personid === id){
                    console.log(conection)
                    return conection
                }
            })
            modalSetup.value.dataForConfirm.conections = conections
            modalSetup.value.header = `Delete person`
            modalSetup.value.cancelBtn = true
            modalSetup.value.cancelLabel = 'Cancel'
            modalSetup.value.confirmBtn = true
            modalSetup.value.confirmLabel = 'Delete'
            if(conections.length) {
                modalSetup.value.contentMsg = `Na tohoto uzivatele se vazi ukoly. Chcete jej i presto smazat?`
            } else {
                modalSetup.value.contentMsg = `Opravdu smazat uzivatele?`
            }
        }).then(()=> {
            showModal.value = true
        })
    }

    function closeModal () {
        resetModalSetup()
        showModal.value = false
    }

    function deletePerson (payload) {
        if(payload.conections.length) {
            payload.conections.forEach((conection) => {
                pinia.deletePersonstasks(conection.id)
            })
        }
        pinia.deletePerson(payload.personid)
        resetModalSetup()
        closeModal()
    }

    function resetModalSetup () {
        modalSetup.value.header = '',
        modalSetup.value.contentMsg = '',
        modalSetup.value.cancelBtn = false,
        modalSetup.value.confirmBtn = false,
        modalSetup.value.cancelLabel = '',
        modalSetup.value.confirmLabel = '',
        modalSetup.value.dataForConfirm = []
    }


    //Methods
    function editPerson() {
        router.push('/form-person/' + props.person.id)
    }
    function clickOnContainer () {
        emit('container-clicked')
    }

</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';
.person-container {
    cursor: pointer;
    border: 0px solid $black-lt;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    min-width: 500px;
    padding: .1rem;

    position: relative;
    border-bottom: .5px solid $black-lt;
    &:hover {
        background: $gray;
    }
    .avatar {
        border: 1px solid $black-lt;
        border-radius: 50%;
        
        display: flex;
        align-items: center;
        justify-content: center;
        
        width: 2.5rem;
        height: 2.5rem;
        background: $gray;
        
        font-size: 1rem;
        font-weight: bold;
    }
    .info-area {
        display: flex;
        flex-direction: column;
        align-items: center;
        .name-area {
            font-size: 1.1rem;
            font-weight: 600;
        } 
        .position-area {
            color: $black-lt;
        }
    }
        .icons-area {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin-right: 1rem
        }
    }
.pointer {
cursor: pointer;
padding: 0.3rem;
border-radius: 5px;
&:hover {
    background: $gray-dr;
}
}
.red{
    &:hover {
        color: red;
    }
}
    
    
</style>