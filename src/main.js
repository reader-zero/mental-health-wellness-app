import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')

import { getAiMessage } from './services/aiService'
getAiMessage("I feel tired and stressed").then(console.log)