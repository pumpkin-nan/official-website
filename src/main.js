import { createApp } from 'vue'
// 清除默认样式
import './style/reset.scss'
// import './assets/index.css'
import './assets/output.css' 
import App from './App.vue'
import router from './router'
import { Loader } from '@googlemaps/js-api-loader' //引入

createApp(App).use(router).mount('#app')
