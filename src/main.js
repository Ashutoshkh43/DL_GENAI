import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import './week3.css';
import '../styles.css';
import App from './App.vue';
import Introduction from './views/index.vue';
import GAs from './views/GAs.vue';
import Week1 from './views/week1.vue';
import Week2 from './views/week2.vue';
import Week3 from './views/week3.vue';
import Week4 from './views/week4.vue';
import Week5 from './views/week5.vue';
import Week6 from './views/week6.vue';
import Week7 from './views/week7.vue';
import Week8 from './views/week8.vue';
import Week9 from './views/week9.vue';
import Week10 from './views/week10.vue';
import Week11 from './views/week11.vue';
import Week12 from './views/week12.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Introduction },
    {path:'/GAs',component: GAs},
    { path: '/week1', component: Week1 },
    { path: '/week2', component: Week2 },
    { path: '/week3', component: Week3 },
    { path: '/week4', component: Week4 },
    { path: '/week5', component: Week5 },
    { path: '/week6', component: Week6 },
    { path: '/week7', component: Week7 },
    { path: '/week8', component: Week8 },
    { path: '/week9', component: Week9 },
    { path: '/week10', component: Week10 },
    { path: '/week11', component: Week11 },
    { path: '/week12', component: Week12 },
  ],
  scrollBehavior(to) {
    if (to.hash) return { el: to.hash, behavior: 'smooth' };
    return { top: 0 };
  },
});

createApp(App).use(router).mount('#app');
