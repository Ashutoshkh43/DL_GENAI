document.addEventListener("DOMContentLoaded", () => {
  const tocLinks = [...document.querySelectorAll(".toc a[href^='#']")];
  const sections = tocLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocLinks.forEach(link => {
            const active = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("active", active);
            if (active) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        }
      });
    }, { rootMargin: "-12% 0px -72% 0px" });
    sections.forEach(section => observer.observe(section));
  }
  document.querySelectorAll("a[href^='#']").forEach(link => {
    link.addEventListener("click", event => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) { event.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); history.replaceState(null, "", link.getAttribute("href")); }
    });
  });
});
