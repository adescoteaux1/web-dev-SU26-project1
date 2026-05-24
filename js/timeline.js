/**
 * Staggered fade-in for experience table rows on scroll.
 */
export function initTimeline() {
  const rows = document.querySelectorAll("#expBody tr");
  if (!rows.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const row = entry.target;
          const index = [...rows].indexOf(row);
          row.style.transitionDelay = `${index * 60}ms`;
          row.classList.add("is-visible");
          observer.unobserve(row);
        }
      });
    },
    { threshold: 0.15 }
  );

  rows.forEach((row) => observer.observe(row));
}
