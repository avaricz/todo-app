<template>
    <div class="buttons-container">
        
        <Button
        size="small"
        text class="main-button"
        @click.stop="showSettings"
        >
            <i class="pi pi-cog"></i>
        </Button>

        <div
        v-if="showSettingsMenu"
        class="settings-menu menu">
            <Button 
            class="btn"
            @click="editPositions"
            text
            >Edit positions</Button>
        </div>
        
        <Button
        @click.stop="showMenu"
        text
        class="main-button"
        >
            <i class="pi pi-plus"></i>
        </Button>

        <ContextMenu
        v-if="show"
        @close-me="showMenu"
        />

    </div>
</template>

<script setup>
import { matchedRouteKey, useRouter } from 'vue-router';
import Button from 'primevue/button';
import { ref } from 'vue';
import ContextMenu from '@/components/mainBar/ContextMenu.vue'

const router = useRouter()
const show = ref(false)

const buttonsSetting = [{method: neco, label: neco}]
const showSettingsMenu = ref(false)

function showSettings () {
    showSettingsMenu.value = !showSettingsMenu.value
}

function showMenu () {
    show.value = !show.value
}

const editPositions = () =>{
    router.push('edit-positions')
    showSettings()
}
</script>

<style lang="scss" scoped>
@import '@/assets/base.scss';

.buttons-container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    gap: 1rem;
    height: 3rem;
    padding-right: 1rem;
    .main-button {
        &:hover {
            background: $gray-dr;
        }
    }
    .menu {
        position: absolute;
        bottom: 50px;
        display: flex;
        gap: .2rem;
        flex-direction: column;
        box-shadow: 0 0 5px -1px $black-lt;
        background: $gray;
        padding: .3rem;
        border-radius: 10px;
        .btn{
            &:hover {
                background: $gray-dr
            }
        }
    }
    .new-item-menu {
        right: 0;
        margin-right: .5rem;
    }
    .settings-menu {
        left: 0;
        margin-left: .5rem;
    }
}
</style>