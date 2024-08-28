<template>

    <div class="person-container">
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
            @click.stop="deletePerson"
            ></i>
        </div>
    </div>

</template>

<script setup>
    import { useRouter } from 'vue-router';
    import { usePinia } from '@/store';
    import { ref } from 'vue'

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

    const initials = ref(props.person.first[0].toUpperCase() + props.person.last[0].toUpperCase())

    //Methods
    function deletePerson() {
        pinia.deletePerson(props.person.id)
    }
    function editPerson() {
        router.push('/form-person/' + props.person.id)
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