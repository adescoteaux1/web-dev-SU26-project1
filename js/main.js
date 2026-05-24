import { initNav } from "./nav.js";
import { initTimeline } from "./timeline.js";
import { initTerminal } from "./terminal.js";

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initTimeline();
  initTerminal();
});
