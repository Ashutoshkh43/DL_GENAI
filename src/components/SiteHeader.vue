<template>
  <header class="site-header">
    <div class="topbar">
      <router-link class="brand" to="/">BSDA2001 · Deep Learning</router-link>
      <nav class="site-nav" aria-label="Main navigation">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          :aria-current="page === link.page ? 'page' : null"
        >
          {{ link.label }}
        </router-link>
      </nav>
    </div>
    <div class="page-intro">
      <h1>{{ content.title }}</h1>
      <p>{{ content.description }}</p>
    </div>
  </header>
</template>

<script>
import { pageConfig } from '../pageConfig';

export default {
  props: { page: { type: String, required: true } },
  data() {
    return {
      navLinks: [
        { page: 'index', path: '/', label: 'Introduction' },
        { page: 'week1', path: '/week1', label: 'Week 1' },
        { page: 'week2', path: '/week2', label: 'Week 2' },
        { page: 'week3', path: '/week3', label: 'Week 3' },
        { page: 'week4', path: '/week4', label: 'Week 4' },
      ],
    };
  },
  computed: {
    content() { return pageConfig[this.page]; },
  },
};
</script>
