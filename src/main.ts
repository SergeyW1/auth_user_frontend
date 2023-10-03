import {createApp} from 'vue'
import App from './App.vue'
import './style/main.css'
import {createPinia} from "pinia";
import router from './router/index'

const app = createApp(App)

app.use(router).use(createPinia()).mount('#app')
