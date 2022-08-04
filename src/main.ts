import { createApp } from 'vue';
import 'virtual:windi.css';
import App from './App.vue';
import { setupRouter } from './router';

const app = createApp(App);

// 挂载路由
setupRouter(app);

app.mount('#app');
