<template>
    <template v-if="!editMode">
        <div class="position-container">
            <div class="position-header">{{ position.position }}</div>

            <div class="icons-wrapper">
                <i class="pi pi-cog pointer" @click="editPosition"></i>

                <i class="pi pi-times-circle pointer red" @click="openModal(position.id)"></i>
            </div>
        </div>
    </template>
    <template v-if="editMode">
        <PositionItemForm 
        :position="position"
        :editMode="editMode"
        @cancelEdit="cancelEdit"/>
    </template>
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
        @confirm="deletePosition" />
</template>

<script setup>
    import { usePinia } from '@/store';
    import PositionItemForm from './PositionItemForm.vue';
    import { ref } from 'vue';
    import DefaultModal from './DefaultModal.vue';
    
    const pinia = usePinia()
    const emit = defineEmits(['editPosition'])
    const props = defineProps({
        position: {
            type: Object,
            require: true
        }
    })

    const editMode = ref(false)

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
        modalSetup.value.dataForConfirm.positionid = id

        pinia.fetchPersons().then( data => {
            const conections = data.filter(person => {
                if (person.positionid === id){
                    return person
                }
            })
            modalSetup.value.dataForConfirm.conections = conections
            if(conections.length) {
                modalSetup.value.header = `Nelze smazat`
                modalSetup.value.contentMsg = `Nelze smazat pozici, ke ktere se vazi lide.`
                modalSetup.value.cancelBtn = true
                modalSetup.value.cancelLabel = 'Ok'
            } else {
                modalSetup.value.header = `Smazat pozici`
                modalSetup.value.contentMsg = `Opravdu chcete smazat tuto pozici?`
                modalSetup.value.cancelBtn = true
                modalSetup.value.cancelLabel = 'Cancel'
                modalSetup.value.confirmBtn = true
                modalSetup.value.confirmLabel = 'Delete'
            }
        }).then(()=> {
            showModal.value = true
        })
    }

    function closeModal () {
        resetModalSetup()
        showModal.value = false
    }

    function deletePosition (payload) {
        pinia.deletePosition(payload.positionid)
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
        modalSetup.value.dataForConfirm = {}
    }


    // Methods
    function editPosition() { 
        editMode.value = true
    }
    function cancelEdit() {
        editMode.value = false
    }

</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';
.position-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 29.5px;
}
.position-header {
    overflow: hidden;
    text-overflow: ellipsis;
    text-wrap: nowrap;
    white-space: nowrap;
}
.icons-wrapper {
    display: flex;
    align-items: center;
    gap: .5rem;
}
.pointer {
    cursor: pointer;
    padding: 0.3rem;
    border-radius: 5px;
    &:hover {
        background: $gray-dr;
    }
}
.red {
    &:hover {
        color: red
    }
}

</style>