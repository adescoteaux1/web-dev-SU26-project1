import { initNav } from "./nav.js";

/**
 * Tag-based project filter.
 * Reads data-tags on each .proj-row and shows/hides based on active filter.
 */
function initFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const rows = document.querySelectorAll(".proj-row");

  if (!buttons.length || !rows.length) return;

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      buttons.forEach((b) => b.classList.remove("filter-btn--active"));
      btn.classList.add("filter-btn--active");

      rows.forEach((row) => {
        const tags = row.dataset.tags || "";
        const visible = filter === "all" || tags.includes(filter);
        row.classList.toggle("proj-row--hidden", !visible);
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initFilter();
});
