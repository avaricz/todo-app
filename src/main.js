import './assets/main.scss'

import App from './App.vue'
import router from './router'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import NoirTheme from './primevue/noirtheme'

const app = createApp(App);
const pinia = createPinia()


app.use(PrimeVue, {
    theme: {
        preset: NoirTheme,
        options: {
            prefix: 'p',
            darkModeSelector: '',
            cssLayer: false
        }
    }
});

app.use(pinia)
app.use(router)
app.mount('#app')
