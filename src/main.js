import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './week3.css';
import '../styles.css';
import App from './App.vue';
import Introduction from './views/index.vue';
import Week1 from './views/week1.vue';
import Week2 from './views/week2.vue';
import Week3 from './views/week3.vue';
import Week4 from './views/week4.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Introduction },
    { path: '/week1', component: Week1 },
    { path: '/week2', component: Week2 },
    { path: '/week3', component: Week3 },
    { path: '/week4', component: Week4 },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0 };
  },
});

createApp(App).use(router).mount('#app');
