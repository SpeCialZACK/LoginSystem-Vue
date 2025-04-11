import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' // router/index.js 用在這邊

const app = createApp(App)
app.use(router)
app.mount('#app')
