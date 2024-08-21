<template>
    <template v-if="!editMode">
        <div class="position-container">
            <div class="position-header">{{ position.position }}</div>

            <div class="icons-wrapper">
                <i class="pi pi-cog pointer" @click="editPosition"></i>

                <i class="pi pi-times-circle pointer red" @click="deletePosition"></i>
            </div>
        </div>
    </template>
    <template v-if="editMode">
        <PositionItemForm 
        :position="position"
        :editMode="editMode"
        @cancelEdit="cancelEdit"/>
    </template>
</template>

<script setup>
    import { usePinia } from '@/store';
    import PositionItemForm from './PositionItemForm.vue';
    import { ref } from 'vue';
    
    const pinia = usePinia()
    const emit = defineEmits(['editPosition'])
    const props = defineProps({
        position: {
            type: Object,
            require: true
        }
    })

    const editMode = ref(false)

    // Methods
    function deletePosition() {
        pinia.deletePosition(props.position.id)
    }
    function editPosition() { 
        editMode.value = true
    }
    function cancelEdit() {
        editMode.value = false
    }

</script>

<style lang="scss" scoped>
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
}
.red {
    &:hover {
        color: red
    }
}

</style>