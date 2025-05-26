import { createApp } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css'
import App from './App.vue'
import axios from 'axios';
import { createPinia } from 'pinia';

import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css'


axios.defaults.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const app = createApp(App);
app.use(createPinia());
app.config.globalProperties.$axios = axios;

app.use(Vue3Toastify, {
    autoClose: 3000,
} as ToastContainerOptions);

app.mount('#app');
