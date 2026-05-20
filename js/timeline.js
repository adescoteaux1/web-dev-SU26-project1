/**
 * Reveals timeline items as the user scrolls into view.
 * Adds a staggered delay per item.
 */
export function initTimeline() {
  const items = document.querySelectorAll(".timeline__item");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const index = [...items].indexOf(el);
          el.style.transitionDelay = `${index * 80}ms`;
          el.classList.add("is-visible");
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.2 }
  );

  items.forEach((item) => observer.observe(item));
}
