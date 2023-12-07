import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './styles.css'; // Import the global styles

createApp(App).use(router).mount('#app')
