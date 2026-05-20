import { initNav } from "./nav.js";

/**
 * Filter projects by tag.
 * Reads data-tags attribute from each project card.
 */
function initProjectFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".proj");

  if (!buttons.length || !projects.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // Update active state
      buttons.forEach((b) => b.classList.remove("filter-btn--active"));
      btn.classList.add("filter-btn--active");

      // Show/hide projects
      projects.forEach((proj) => {
        const tags = proj.dataset.tags || "";
        const matches = filter === "all" || tags.includes(filter);

        if (matches) {
          proj.classList.remove("proj--hidden");
        } else {
          proj.classList.add("proj--hidden");
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initProjectFilters();
});
