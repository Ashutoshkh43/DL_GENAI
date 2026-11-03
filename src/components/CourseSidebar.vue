<template>
  <nav class="toc" aria-label="On this page">
    <strong>Course weeks</strong>
    <router-link
      v-for="link in navLinks"
      :key="link.path"
      :to="link.path"
      :aria-current="page === link.page ? 'page' : null"
    >
      {{ link.label }}
    </router-link>
    <hr class="sidebar-divider">
    <strong>{{ content.tocTitle }}</strong>
    <div class="nav-links">
      <a v-for="item in content.topics" :key="item.href" :href="item.href">{{ item.text }}</a>
    </div>
  </nav>
</template>

<script>
import { pageConfig } from '../pageConfig';

export default {
  props: { page: { type: String, required: true } },
  data() {
    return {
      navLinks: [
        { page: 'index', path: '/', label: 'Introduction' },
        {page: 'GAs', path: '/GAs',label:'Graded Assignments'},
        { page: 'week1', path: '/week1', label: 'Week 1' },
        { page: 'week2', path: '/week2', label: 'Week 2' },
        { page: 'week3', path: '/week3', label: 'Week 3' },
        { page: 'week4', path: '/week4', label: 'Week 4' },
        { page: 'week5', path: '/week5', label: 'Week 5' },
        { page: 'week6', path: '/week6', label: 'Week 6' },
        { page: 'week7', path: '/week7', label: 'Week 7' },
        { page: 'week8', path: '/week8', label: 'Week 8' },
        { page: 'week9', path: '/week9', label: 'Week 9' },
        { page: 'week10', path: '/week10', label: 'Week 10' },
        { page: 'week11', path: '/week11', label: 'Week 11' },
        { page: 'week12', path: '/week12', label: 'Week 12' },
      ],
    };
  },
  computed: {
    content() { return pageConfig[this.page]; },
  },
};
</script>
