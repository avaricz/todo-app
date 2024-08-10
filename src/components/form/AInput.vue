<template>

        <ASwitcher 
        @clicked="clickedSwitcher" 
        :checked="isSwitchOn"
        />

    
    <div class="container" >
        <input type="text" placeholder="search"  @focus="focus" @blur="blur" v-model="inputValue" @keydown="keydown">
        
        <div class="options-container">
            <transition name="rolldown">
            <ul v-if="focused" class="options-col">
                <li v-for="(city, index) in filteredCities" 
                class="options-row"
                :class="{'selected': selected(index)}" 
                @click="selectItemByMouse(index)" 
                >{{ city }}</li>
            </ul>
            </transition>
        </div>

    </div>
</template>

<script setup>
    import { ref, computed, watch } from 'vue'
    import ASwitcher from '@/components/ASwitcher.vue'

    // Input from User
    const inputValue = ref("")
    /* const selected = ref([true, false, true]) */
   

    //List of Cities
    const cities = ref(citiesData.map(obj => {return obj.city}))
    
    //List of Filtered Cities
    const filteredCities = computed(() => {
        const regex = new RegExp(`^${inputValue.value}`)

        if(isSwitchOn.value) {
            return cities.value.filter(city => {
                return city.toLowerCase().includes(inputValue.value.toLowerCase())
            })
        }
        if(!isSwitchOn.value) {
            return cities.value.filter(city => {
                if(regex.test(city.toLowerCase())) {
                    return city.toLowerCase().includes(inputValue.value.toLowerCase())
                }

            })
        }
    })

    //Switcher  
    const isSwitchOn = ref(false)

    const clickedSwitcher = () => {
        isSwitchOn.value = !isSwitchOn.value
    }

    // FOCUS or BLUR
    let focused = ref(false)

    const focus = () => {
        focused.value = true
    }

    const blur = (e) => {
        selectedItem.value = -1
        focused.value = false
        
    }

    // when ITEM is SELECTED
    const selectItemByMouse = (index) => {
        inputValue.value = filteredCities.value[index]
    }

    const selectedItem = ref(-1)
    watch(inputValue, () => {
            selectedItem.value = -1
    }) 

    const selected = (index) => {
        if(selectedItem.value === index) {
            return true
        }
    }

   
    const keydown = ( e) => {
        if(e.key === "ArrowDown") {
            if(selectedItem.value === filteredCities.value.length -1){
                selectedItem.value = -1
                
            }
            selectedItem.value += 1
            console.log(filteredCities.value[selectedItem.value])
        }
        if(e.key === "ArrowUp") {
            if(selectedItem.value <= 0 ) {
                selectedItem.value = filteredCities.value.length
            }
            selectedItem.value -= 1
            console.log(filteredCities.value[selectedItem.value])
        }
        if(e.key === "Enter") {
            inputValue.value = filteredCities.value[selectedItem.value]
        }
    };

    

  

</script>

<style scoped>
* {
    box-sizing: border-box;
}



.container {
    display: flex;
    flex-direction: column;

    width: 100%;
    overflow: none;
}

input {
    font-size: 1.6rem;

    padding: .7rem;

    border: 1px solid #ccc;
    border-radius: 15px;  

    background: #fafafa;

    transition: all .2s linear;
}

input:focus {
    background: #fff;
    border-radius: 15px 15px 0 0;
    outline: none;
    transition: all .2s linear;
    border: 1px solid #ccc;

}



.options-container {
    overflow: hidden;
    border-radius: 0 0 15px 15px;
    background: #fafafa;
}

.options-col {
    border: 1px solid #ccc;
    border-top: 0;
    border-radius: 0 0 15px 15px;
    overflow: auto;

    max-height: 20rem;

    list-style-type: none;
    
    margin: 0;
    padding: 0;

    font-size: 1.4rem;
    color: #777;
}

.options-row {
    padding: .2rem .7rem;
    cursor: pointer;
}

.options-row:hover {
    background: #ededed;
}
.selected {
    background: #ededed;
}


.rolldown-enter-from,
.rolldown-leave-to {
    max-height: 0;
    border: 0px solid #fff;
    border-top: 0px solid #cccccc;
    background: #fff;
}
.rolldown-enter-to
.rolldown-leave-from {
    max-height: 100%;
    
    border: 1px solid #cccccc;
    border-top: 0;
    background: #fafafa
}

.rolldown-enter-active,
.rolldown-leave-active {
    transition: all .2s linear;
}
</style>