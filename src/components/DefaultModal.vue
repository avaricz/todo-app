<template>
    <div class="modal-bg" v-if="show">
      <div class="modal-body" id="modal-body">
        <div class="modal-content">
          {{  msg }}
        </div>
        <div class="modal-footer">
          <button v-if="cancelBtn" @click.stop="$emit('cancel')">{{ cancelLabel }}</button>
          <button v-if="confirmBtn" @click.stop="$emit('confirm')">{{ confirmLabel }}</button>
        </div>
      </div>
    </div>
  </template>
  
<script setup>
  import { watch,} from 'vue'

  const props = defineProps({
    msg: String,
    cancelBtn: {
      type: Boolean,
      default: false
    },
    confirmBtn: {
      type: Boolean,
      default: false
    },
    cancelLabel: {
      type: String,
      default: 'cancel'
    },
    confirmLabel: {
      type: String,
      default: 'OK'
    },
    show: {
      type: Boolean
    }
  })

  const emit = defineEmits(['close-me'])

  // Methods
  function clickOutside (e) {
    const el = document.getElementById('modal-body')
    if(!el.contains(e.target)) {
      console.log('clickam vedle')
      emit('close-me')
    }
  }

    
/*     // Lifecycle hooks
    onMounted (() => {
        document.addEventListener('click', clickOutside)
    })

    onUnmounted (() => {
        document.removeEventListener('click', clickOutside)
    })  */
        
        
    // Watchers
    watch (() => props.show, (newValue, oldValue) => {
        if (newValue === true) {
            console.log('newValue je true :', newValue);
            document.addEventListener('click', clickOutside)
        } else {
            console.log('neValue is false :', newValue);
            document.removeEventListener('click', clickOutside)
        }
    }) 
    

  </script>
  
  <style scoped>
    .modal-bg {
      width: 100vw;
      height: 100vh;
      position: fixed;
      left: 0;
      top: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0, 0, 0, .1)
    }
    .modal-body {
      min-width: 300px;
      min-height: 100px;
      background: white;
      padding: .5rem;
      display: flex;
      flex-direction: column;
    }
    .modal-content {
      flex-grow: 1;
    }
    .modal-footer {
      flex-basis: 30px;
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      align-items: center;
    }
  </style>