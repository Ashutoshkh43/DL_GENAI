
<template>
  <router-view />
</template>

<script>
const pageTitles = {
  '/': 'Introduction to Deep Learning & Generative AI | BSDA2001',
  '/week1': 'Week 1 — Deep Learning Foundations | BSDA2001',
  '/week2': 'Week 2 — Training & Practice | BSDA2001',
  '/week3': 'Week 3 — Convolutional Neural Networks | BSDA2001',
  '/week4': 'Week 4 — Transfer Learning & Segmentation | BSDA2001',
};

export default {
  data() {
    return { observer: null };
  },
  watch: {
    '$route'() {
      this.$nextTick(() => this.refreshPageBehaviors());
    },
  },
  mounted() {
    this.refreshPageBehaviors();
  },
  beforeUnmount() {
    this.observer?.disconnect();
  },
  methods: {
    refreshPageBehaviors() {
      document.title = pageTitles[this.$route.path] || pageTitles['/'];
      this.observer?.disconnect();

      const links = [...document.querySelectorAll('.toc a[href^="#"]')];
      const sections = links
        .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
        .filter(Boolean);

      if ('IntersectionObserver' in window && sections.length) {
        this.observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            links.forEach((link) => {
              const active = link.hash === `#${entry.target.id}`;
              link.classList.toggle('active', active);
              if (active) link.setAttribute('aria-current', 'location');
              else link.removeAttribute('aria-current');
            });
          });
        }, { rootMargin: '-12% 0px -72% 0px' });
        sections.forEach((section) => this.observer.observe(section));
      }

      if (window.MathJax?.typesetPromise) window.MathJax.typesetPromise();
    },
  },
};
</script>
