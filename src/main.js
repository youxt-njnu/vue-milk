import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.scss'
import router from '@/router'
import App from './App.vue'
import vuetify from '@/theme/ui/vuetify.js'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
