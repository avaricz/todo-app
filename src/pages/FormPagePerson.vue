<template>

    <FormView #person-form>
        <form  @submit.prevent="onSubmit" class="form">
            
            <InputText :settings="formSettings.firstName" />

            <InputText :settings="formSettings.lastName" />

            <label for="position">Position: </label>
                <InputSelect :settings="formSettings.positions" />

            <div class="btn-container">
                <SubmitButton 
                :label="formSettings.button.label"
                :type="formSettings.button.type"/>
            </div>
        </form>
    </FormView>

</template>

<script setup>
import {ref} from 'vue'
import FormView from '@/layouts/FormView.vue'
import InputText from '@/components/form/InputText.vue';
import SubmitButton from '@/components/form/StandardButton.vue';
import { methods, paths } from '@/data/db'
import InputSelect from '@/components/form/inputSelect.vue';

const formSettings = ref({
    firstName: {
        id: "first-name",
        placeholder: "Enter your firstname",
        inputValue: "",
        maxlength: 255
    },
    lastName: {
        id: "last-name",
        placeholder: "Enter your lastname",
        inputValue: "",
        maxlength: 255
    },
    positions: {
        inputValue: ""
    },
    button: {
        label: "Add person",
        type: "submit"
    }
})


// Odesle data do databaze
const onSubmit = () => {
    const { allProjects } = paths

}
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
}

.btn-container {
    display: flex;
    justify-content: end;
}
</style>