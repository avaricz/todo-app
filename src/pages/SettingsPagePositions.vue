<template>
    <SettingsView>

        <div class="settings-wrapper" >
   
            <PositionItem 
            v-for="position in positionsList" 
            :key="position.id"
            :position="position"
            />
                    
            <div class="position-form">
                <InputText 
                style="background: inherit;"
                placeholder="+ new position"
                size="small"
                type="text"
                fluid
                v-model="positionValue.position"
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
        </div>

    </SettingsView>
</template>

<script setup>
    import PositionItem from '@/components/PositionItem.vue';
    import SettingsView from '@/layouts/SettingsView.vue';
    import InputText from 'primevue/inputtext';
    import { methods, paths } from '@/data/db'
    import { ref, computed, onMounted } from 'vue';
    import { usePinia } from '@/store'

    const pinia = usePinia()
    const { post } = methods
    const { allPositions } = paths

    const positionValue = ref({
        position: ""
    })

    const positionsList = computed(()=>{
        return pinia.positions
    })

    // Methods
    function createPosition() {
        post(allPositions, positionValue.value).then(() => {
            pinia.fetchPositions()
        })
        clearInput()
    }
    function clearInput() {
        positionValue.value.position = ""
    }
    onMounted(()=>{
        pinia.fetchPositions()
    })

</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';
.settings-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border-radius: 10px;
    box-shadow: 0 0 5px -1px $black-lt;
    padding: 1rem;
    max-width: 500px;
    background: $gray
}

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