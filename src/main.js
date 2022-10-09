import { createApp } from 'vue'
import App from './App.vue'
import router from './router/'
import './assets/main.css' //importing libraries and assets.
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'


const app = createApp(App)

app.use(router)

app.mount('#app')
