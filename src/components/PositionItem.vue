<template>
    <div class="position-container">
        <div class="position-header">{{ position.position }}aa</div>

        <div class="icons-wrapper">
            <i class="pi pi-cog pointer" @click="editPosition(task.id)"></i>

            <i class="pi pi-times-circle pointer red" @click="deletePosition"></i>
        </div>
    </div>
</template>

<script setup>
    import { usePinia } from '@/store';
    
    const pinia = usePinia()
    const props = defineProps({
        position: {
            type: Object,
            require: true
        }
    })

    // Methods
    function deletePosition() {
        pinia.deletePosition(props.position.id)
    }
    function editPosition(taskid) { //TODO
        router.push('/form-task/' + taskid)
    }


</script>

<style lang="scss" scoped>
.position-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
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