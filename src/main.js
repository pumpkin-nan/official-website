import { createApp } from 'vue'
// 清除默认样式
import './style/reset.scss'
import './assets/index.css'
import App from './App.vue'
import router from './router'
createApp(App).use(router).mount('#app')
